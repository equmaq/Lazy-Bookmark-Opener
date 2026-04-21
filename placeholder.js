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

function runWhenTabFocused(callback) {
  function check() {
    if (document.visibilityState === "visible" && document.hasFocus()) {
      callback();
    }
  }

  document.addEventListener("visibilitychange", check);
  window.addEventListener("focus", check);

  // initial check in case it's already focused
  check();
}

runWhenTabFocused(() => {
  console.log("Tab is focused and visible");

  if (data?.url) {
    window.location.href = data.url;
  }
});

setTimeout(() => {
    location.reload();
  }, 500)