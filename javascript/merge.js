let img = document.querySelector("#img");
let w, h;
let c = document.querySelector("canvas");
let ctx = c.getContext("2d");
let i = 0;
document.querySelector("#file").onclick = function () {
    i++;
};
document.querySelector("#file").addEventListener("change", function () {
    img.src = URL.createObjectURL(document.querySelector("#file").files[0]);
    
});
document.querySelector("#add").onclick = function () {
    document.querySelector("#file").click();
};
document.querySelector("#save").addEventListener("click", function () {
    document.querySelector("header").style.filter = 'blur(5px)';
    document.querySelector("#imageDiv").style.filter = 'blur(5px)';
    document.querySelector("#loading").classList.remove("d-none");
    var link = document.createElement('a');
    link.download = 'image.png';
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
img.onload= function(){
    if (i % 2 == 1) {
        c.width = 2 * img.width;
        c.height = img.height;
        w = img.width;
        h = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
        c.classList.remove('d-none');
        document.querySelector("#chooseImage").innerHTML = "<i class=\"fa-solid fa-image\"></i>&nbsp;add image 2";
        document.querySelector("#add").classList.add("d-none");
        document.querySelector("#save").classList.add("d-none");
    }
    if (i % 2 == 0) {
        ctx.drawImage(img, 0, 0, img.width, img.height, w, 0, w, h);
        document.querySelector("#save").classList.remove("d-none");
        document.querySelector("#chooseImage").innerHTML = "<i class=\"fa-solid fa-image\"></i>&nbsp;add image 1";
        document.querySelector("#chooseImage").classList.add("d-none");
        document.querySelector("#another").classList.remove("d-none");
    }
}
document.querySelector("#another").onclick = function () {
    img.src = "";
    document.querySelector("#another").classList.add("d-none");
    c.classList.add('d-none');
    document.querySelector("#add").classList.remove("d-none");
    document.querySelector("#chooseImage").classList.remove("d-none");
};

