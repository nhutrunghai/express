const changeStatus = document.querySelectorAll("span[change-status]");
const formChangeSingle = document.querySelector("form[form-change]");
// handle changes=Status
changeStatus.forEach((element) => {
  element.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    const status = e.target.dataset.status === "active" ? "inactive" : "active";
    const action =
      formChangeSingle.getAttribute("data-path") +
      "/" +
      status +
      "/" +
      id +
      "?_method=PATCH";
    formChangeSingle.setAttribute("action", action);
    formChangeSingle.submit();
  });
});
