function toggleDropdown(){
    var dropdownContent = document.getElementById('dropdownOptContent');
        dropdownContent.classList.toggle('active');
        dropdownContent.style.transitionDuration=2000;
}

function toggleSideMenu() {
    var dropdownContent = document.getElementById("dropdownOptContent");
    dropdownContent.classList.toggle("open");
  }
  