const previewWrap = document.querySelector(".preview-wrap");
const inputFile = document.querySelector("input[name='thumbnail']");
const deleImage = previewWrap.querySelector("button");
const imgPriview = previewWrap.querySelector("img");
function setBtnDelete(status = true) {
  deleImage.hidden = status;
}

if (!imgPriview.src) setBtnDelete(true);
inputFile.addEventListener("change", (e) => {
  setBtnDelete(false);
  const url = URL.createObjectURL(inputFile.files[0]);
  imgPriview.src = url;
  imgPriview.onload = () => {
    URL.revokeObjectURL(url);
  };
});
deleImage.onclick = () => {
  imgPriview.src = "";
  setBtnDelete(true);
  inputFile.value = "";
};
