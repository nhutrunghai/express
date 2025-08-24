const checkAllItems = document.querySelector("input[name='checkall']");
const checkboxItems = document.querySelectorAll("input[checkItem]");
const lengthItems = checkboxItems.length;
const formChangeMulti = document.querySelector("form[form-change-multi]");
const inputSaveId = document.querySelector('input[name="ids"]');
const idCheckeds = [];
const select = document.querySelector("select.form-control");
let itemTicks = document.querySelectorAll("input[checkItem]:checked");
checkAllItems.addEventListener("change", () => {
  checkboxItems.forEach((element) => {
    element.checked = checkAllItems.checked;
    // element.dispatchEvent(
    //   new Event("change")
    // ); /*Nếu bạn dùng mỗi câu lệnh trên  thì thực chất bạn chỉ gán
    //  property checked thôi trình duyệt sẽ ko thể biết đc change , vì vậy thằng này sinh ra để thông báo
    //  cho trình duyệt biết đc "À thằng này vừa thay đổi đó "
  });
});
checkboxItems.forEach((element) => {
  element.addEventListener("click", () => {
    itemTicks = document.querySelectorAll("input[checkItem]:checked");
    if (lengthItems === itemTicks.length) {
      checkAllItems.checked = true;
    } else {
      checkAllItems.checked = false;
    }
  });
});
formChangeMulti.addEventListener("submit", (e) => {
  e.preventDefault();
  itemTicks = document.querySelectorAll("input[checkItem]:checked");

  if (select.value === "changel-postion") {
    itemTicks.forEach((element) => {
      const postion = element
        .closest("tr")
        .querySelector("input[type='number']").value;
      const temp = element.value + "-" + postion;
      idCheckeds.push(temp);
    });
  } else {
    itemTicks.forEach((element) => {
      idCheckeds.push(element.value);
    });
  }
  inputSaveId.value = idCheckeds.join(",");
  e.target.submit();
});
