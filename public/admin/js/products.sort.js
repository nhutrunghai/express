const sortGroup = document.getElementById("sortGroup");
const priceMenu = document.getElementById("priceMenu");
const priceToggle = document.getElementById("priceToggle");

function setActive() {
  const url = new URL(location.href);
  const sortKey = url.searchParams.get("sortBy");
  if (sortKey) {
    if (["position", "new", "quanity"].includes(sortKey)) {
      sortGroup
        .querySelector(`button[data-sort=${sortKey}]`)
        .classList.add("active");
    } else {
      const priceActive = priceMenu.querySelector(
        `button[data-sort*=${url.searchParams.get("order")}]`
      );
      priceActive.classList.add("active", "text-warning");
      setDropdownLabel(priceActive.innerText);
      priceToggle.classList.add("active");
    }
  } else {
    sortGroup
      .querySelector("button[data-sort='position']")
      .classList.add("active");
  }
}
setActive();
function removeSortGroup() {
  sortGroup.querySelectorAll("button[data-sort]").forEach((element) => {
    element.classList.remove("active");
  });
}
function removePriceMenu() {
  priceMenu.querySelectorAll("button[data-sort]").forEach((element) => {
    element.classList.remove("active", "text-warning");
  });
}
function setDropdownLabel(labelText = "Giá") {
  priceToggle.innerText = labelText;
}
function handleSort(sort, labelText) {
  removeSortGroup();
  removePriceMenu();
  setDropdownLabel(labelText);
  const url = new URL(location.href);
  if (["position", "new", "quanity"].includes(sort)) {
    if (url.searchParams.get("order")) {
      url.searchParams.delete("order");
    }
    priceToggle.classList.remove("active");
    url.searchParams.set("sortBy", sort);
  } else {
    const [key, order] = sort.split("_");
    url.searchParams.set("sortBy", key);
    url.searchParams.set("order", order);
  }
  location.href = url.href;
}
sortGroup.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-sort]");
  if (!btn) return;
  handleSort(btn.dataset.sort);
  e.target.classList.add("active");
});
priceMenu.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-sort]");
  if (!btn) return;
  handleSort(btn.dataset.sort, e.target.innerText);
  e.target.classList.add("text-warning");
  priceToggle.classList.add("active");
});
