const buttonStatus = document.querySelectorAll("button[data-set]");
const url = new URL(location.href);
function handleUrl(key, value,flag = true) {
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
  if(flag){
    url.searchParams.set('page','1')
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
let page = querySearch.get("page");
if(!page) {
  page = 1
  querySearch.set('page','1')
  history.pushState(null,null,`?${querySearch}${location.hash}`)
}else{
  if(document.querySelectorAll(".page-item").length === 0){
    querySearch.delete('page')
    history.pushState(null,null,`?${querySearch}${location.hash}`)
  }
}


const pageActive = document.querySelector(`.page-item[data-set="${page}"]`)
if(pageActive) pageActive.classList.add('active')

const pagination = document.querySelectorAll(".page-item");
pagination.forEach((element) => {
  element.onclick = () => {
    const page = element.dataset.set;
    handleUrl("page", page,false);
  };
});
