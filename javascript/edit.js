let img = document.querySelector("img");
let filterControls = document.querySelectorAll("input[type=range]");
let c = document.querySelector("canvas");
let ctx = c.getContext("2d");
document.querySelector("#file").addEventListener("change", function () {
    img.src = URL.createObjectURL(document.querySelector("#file").files[0]);
    document.querySelector("#add").classList.add("d-none");
    document.querySelector("#chooseImage").innerHTML = "<i class=\"fa-solid fa-image\"></i>&nbsp;change photo";
    document.querySelector("#filtering").classList.remove("d-none");
    document.querySelector("#save").classList.remove("d-none");
    document.querySelector("#reset").classList.remove("d-none");
});
document.querySelector("#add").onclick = function () {
    document.querySelector("#file").click();
};
img.onload = function () {
    c.classList.remove("d-none");
    c.width = img.width;
    c.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
}
function applyfilter() {
        let computedFilters = '';
        filterControls.forEach(function (item) {
            computedFilters += item.getAttribute('data-filter') + '(' + item.value + item.getAttribute('data-scale') + ')';
        });
    ctx.filter = computedFilters;
    c.style.filter = ctx.filter;
    };
document.querySelector("#save").addEventListener("click", function () {
    document.querySelector("header").style.filter = 'blur(5px)';
    document.querySelector("#imageDiv").style.filter = 'blur(5px)';
    
    document.querySelector("#loading").classList.remove("d-none");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var link = document.createElement('a');
    link.download = 'c.png'
    link.href = c.toDataURL();
    link.click();
    setTimeout(function () {
        document.querySelector("#loading").classList.add("d-none");
        document.querySelector("#saved").classList.remove("d-none");
        document.querySelector("#saved").style.border = '0px';
    }, 5000);
    setTimeout(function () {
        document.querySelector("#saved").classList.add("d-none");
        document.querySelector("header").style.filter = 'blur(0px)';
        document.querySelector("#imageDiv").style.filter = 'blur(0px)';
    }, 6000);
});
document.querySelector("#reset").addEventListener("click", function () {
    document.querySelector("#blur").value = 0;
    document.querySelector("#brightness").value = 100;
    document.querySelector("#contrast").value = 100;
    document.querySelector("#grayscale").value = 0;
    document.querySelector("#hue-rotate").value = 0;
    document.querySelector("#invert").value = 0;
    document.querySelector("#opacity").value = 100;
    document.querySelector("#saturate").value = 100;
    document.querySelector("#sepia").value = 0;
    applyfilter();
    ctx.drawImage(img, 0, 0, img.width, img.height);
});

