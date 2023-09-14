var clickCount = 0;

function toggleDropdown(){
    var dropdownContent = document.getElementById('dropdownOptContent');
        dropdownContent.classList.toggle('active');
}

function toggleSideMenu() {
    var optBtns = document.querySelector(".opt-btns");
    var icon = document.getElementById("arrowIcon");
    let optBtn1 = document.getElementById("optBtn1");
    let optBtn2 = document.getElementById("optBtn2");
    let optBtn3 = document.getElementById("optBtn3");

    clickCount++;
    if (clickCount % 2 === 1){
        optBtn1.style.display = "flex";
        optBtn2.style.display = "flex";
        optBtn3.style.display = "flex";
        icon.classList.add('fa-circle-arrow-left');
        icon.classList.remove('fa-circle-arrow-right');
        optBtns.classList.remove("close-animation");
        optBtns.classList.add("open-animation");
    }
    else{
        optBtn1.style.display = "none";
        optBtn2.style.display = "none";
        optBtn3.style.display = "none";
        icon.classList.add('fa-circle-arrow-right');
        icon.classList.remove('fa-circle-arrow-left');
        optBtns.classList.remove("open-animation");
        optBtns.classList.add("close-animation");
    }
}