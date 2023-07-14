var clickCount = 0;

function toggleDropdown(){
    var dropdownContent = document.getElementById('dropdownOptContent');
        dropdownContent.classList.toggle('active');
}

function toggleSideMenu() {
    var optBtns = document.querySelector(".opt-btns");
    var icon = document.getElementById("arrowIcon");

    clickCount++;
    if (clickCount % 2 === 1){
        icon.classList.add('fa-circle-arrow-left');
        icon.classList.remove('fa-circle-arrow-right');
        optBtns.classList.remove("close-animation");
        optBtns.classList.add("open-animation");
    }
    else{
        icon.classList.add('fa-circle-arrow-right');
        icon.classList.remove('fa-circle-arrow-left');
        optBtns.classList.remove("open-animation");
        optBtns.classList.add("close-animation");
    }
}