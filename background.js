// Create context menu for bookmark folders
browser.contextMenus.create({
	id: "open-lazy",
	title: "Open with Lazy Bookmark Opener",
	contexts: ["bookmark"]
});

function unwrapUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);

    // Check protocol + pathname only (ignore extension ID entirely)
    if (
      url.protocol === "moz-extension:" &&
      url.pathname.endsWith("/placeholder.html") &&
      url.hash
    ) {
      const data = JSON.parse(decodeURIComponent(url.hash.slice(1)));
      return data.url || rawUrl;
    }
  } catch {
    // ignore parsing errors
  }

  return rawUrl;
}

// Helper: recursively collect URLs from a folder
async function getDirectBookmarks(folderId) {
  const children = await browser.bookmarks.getChildren(folderId);
  return children
    .filter(node => node.url)
    .map(node => ({
      url: unwrapUrl(node.url),
      title: node.title || node.url
    }));
}

browser.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId !== "open-lazy") return;

	const urls = await getDirectBookmarks(info.bookmarkId);

	let createdTabs = [];

	let baseTab = tab;

	if (!baseTab) {
		const tabs = await browser.tabs.query({ active: true, currentWindow: true });
		baseTab = tabs[0];
	}

	let index = baseTab ? baseTab.index + 1 : undefined;

	for (const node of urls) {
		const placeholderUrl =
			browser.runtime.getURL("placeholder.html") +
			"#" +
			encodeURIComponent(JSON.stringify(node));

		const newTab = await browser.tabs.create({
			url: placeholderUrl,
			active: false,
			index: index
		});

		if (index !== undefined) index++;
		createdTabs.push(newTab.id);
	}

	// Discard all tabs after creation
	setTimeout(async () => {
		for (const tabId of createdTabs) {
			try {
				await browser.tabs.discard(tabId);
			} catch { }
		}
	}, 200);
});

browser.contextMenus.onShown.addListener(async (info) => {
  if (!info.bookmarkId) return;

  const node = await browser.bookmarks.get(info.bookmarkId);
  const isFolder = node && node[0] && !node[0].url;

  browser.contextMenus.update("open-lazy", {
    visible: isFolder
  });

  browser.contextMenus.refresh();
});
