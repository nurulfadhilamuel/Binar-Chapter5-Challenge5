const buton = document.getElementById("buton");
const colapse = document.getElementById("collapseWidthExample");
const main = document.getElementById("main");
buton.onclick = () => {
  colapse.classList.toggle("colapses");
  main.classList.toggle("main-colapse");
};

function hapus(e) {
  const a = e.getAttribute("id");
  const b = document.getElementById("muel");
  b.setAttribute("value", a);
  console.log(b);
}
window.setTimeout(function () {
  $(".alert")
    .fadeTo(500, 0)
    .slideUp(500, function () {
      $(this).remove();
    });
}, 2000);
