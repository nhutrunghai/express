const template = document.querySelector("template.messages");
if (template) {
  const message = template.content.querySelector("span").innerText;
  const check = template.dataset.status === "true" ? true : false;

  if (check) {
    iziToast.success({
      title: "Success!",
      message: message,
      position: "topRight", // Hiển thị ở góc trên phải
      timeout: 5000, // Thời gian hiển thị
      close: true, // Cho phép đóng thông báo
      transitionIn: "fadeInRight", // Animation khi xuất hiện
      transitionOut: "fadeOutRight", // Animation khi đóng
    });
  } else {
    iziToast.error({
      title: "Error !",
      message: message,
      position: "topRight", // Hiển thị ở góc trên phải
      timeout: 5000, // Thời gian hiển thị
      close: true, // Cho phép đóng thông báo
      transitionIn: "fadeInRight", // Animation khi xuất hiện
      transitionOut: "fadeOutRight", // Animation khi đóng
    });
  }
}
