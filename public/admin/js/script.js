const buttonStatus = document.querySelectorAll("button[data-set]");
const url = new URL(location.href);
function handleUrl(key, value) {
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
  location.href = url.href;
}
buttonStatus.forEach((element) => {
  element.onclick = () => {
    const status = element.dataset.set;
    handleUrl("status", status);
  };
});

// handle search
const formSearch = document.querySelector("#search-product");
formSearch.addEventListener("submit", function (e) {
  e.preventDefault();
  const valueInput = this.elements.search.value;
  handleUrl("search", valueInput);
});

// handle page
const querySearch = new URLSearchParams(location.search);
const page = querySearch.get("page");
// if(page){

// }
console.log(document.querySelector(`.page-item[data-set]`).innerText);

const pagination = document.querySelectorAll(".page-item");
pagination.forEach((element) => {
  element.onclick = () => {
    const page = element.dataset.set;
    console.log(page);
    handleUrl("page", page);
  };
});
