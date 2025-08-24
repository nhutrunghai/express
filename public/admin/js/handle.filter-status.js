const buttonStatus = document.querySelectorAll("button[data-set]");
const urlStatus = new URL(location.href);
function handleUrl(key, value) {
  if (value) {
    urlStatus.searchParams.set(key, value);
  } else {
    urlStatus.searchParams.delete(key);
  }
  if (urlStatus.searchParams.get("page")) {
    urlStatus.searchParams.set("page", 1);
  }
  location.href = urlStatus.href;
}
buttonStatus.forEach((element) => {
  element.onclick = () => {
    const status = element.dataset.set;
    handleUrl("status", status);
  };
});
