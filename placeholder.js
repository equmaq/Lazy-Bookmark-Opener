function getData() {
  try {
    return JSON.parse(decodeURIComponent(location.hash.slice(1)));
  } catch {
    return null;
  }
}

const data = getData();

if (data?.title) {
  document.title = data.title;
}

if (data?.url) {
  const icon = document.getElementById("icon");
  icon.href = "https://www.google.com/s2/favicons?domain=" + new URL(data.url).hostname;
}

function loadIfVisible() {
  if (document.visibilityState !== "visible") return;
  if (!data?.url) return;

  if (window.__loading) return;
  window.__loading = true;

  location.replace(data.url);
}

loadIfVisible();
document.addEventListener("visibilitychange", loadIfVisible);

setTimeout(() => {
    location.reload();
  }, 500)