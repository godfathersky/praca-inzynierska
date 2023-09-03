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

// window.addEventListener('load', function() {
//     this.setTimeout(function() {
//         const pageloader = document.getElementById('pageloader');
//         pageloader.style.display = 'none';
      
//         const nav = document.getElementsByTagName('nav')[0];
//         const header = document.getElementsByTagName('header')[0];
//         const main = document.getElementsByTagName('main')[0];
//         nav.style.display = 'flex';
//         header.style.display = 'flex';
//         main.style.display = 'flex';
//     }, 5000);
// });