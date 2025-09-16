const formDelete = document.querySelector("form[form-delete]");
const btnDeletes = document.querySelectorAll(".delete-btn");
if (formDelete) {
  btnDeletes.forEach((btn) => {
    btn.addEventListener("click", () => {
      formDelete.action =
        formDelete.dataset.path + "/" + btn.dataset.id + "?_method=DELETE";
      formDelete.submit();
    });
  });
}
