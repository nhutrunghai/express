const formDelete = document.querySelector("form[form-delete]");
const deleteItems = document.querySelectorAll("button[delete-item]");
const editItems = document.querySelectorAll("button[edit-item]");
const detailItems = document.querySelectorAll("button[view-item]");
const url = new URL(location.href);
// function delete arr
function removeItem(item, arr) {
  const index = arr.indexOf(item);
  arr.splice(index, 1);
}

// handle click delete item
deleteItems.forEach((element) => {
  element.addEventListener("click", () => {
    const id = element.dataset.id;
    const action =
      formDelete.getAttribute("data-path") + "/" + id + "?_method=DELETE";
    formDelete.action = action;
    formDelete.submit();
  });
});

// handle click edit item
editItems.forEach((element) => {
  element.addEventListener("click", () => {
    location.href = location.pathname + "/" + "edit" + "/" + element.dataset.id;
  });
});

// handle click view-item
detailItems.forEach((element) => {
  element.addEventListener("click", () => {
    location.href =
      location.pathname + "/" + "detail" + "/" + element.dataset.id;
  });
});

function handleUrlProducts(key, value, flag = true) {
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
  if (flag) {
    url.searchParams.set("page", "1");
  }
  location.href = url.href;
}

// handle search
const formSearch = document.querySelector("#search-product");
formSearch.addEventListener("submit", function (e) {
  e.preventDefault();
  const valueInput = this.elements.search.value;
  handleUrlProducts("search", valueInput);
});

// handle page
const querySearch = new URLSearchParams(location.search);
let page = querySearch.get("page");
if (!page) {
  page = 1;
  querySearch.set("page", "1");
  history.pushState(null, null, `?${querySearch}${location.hash}`);
} else {
  if (document.querySelectorAll(".page-item").length === 0) {
    querySearch.delete("page");
    history.pushState(null, null, `?${querySearch}${location.hash}`);
  }
}

// handle click page
const pagination = document.querySelectorAll(".page-item");
pagination.forEach((element) => {
  element.onclick = () => {
    const page = element.dataset.set;
    handleUrlProducts("page", page, false);
  };
});
