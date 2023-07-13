function toggleDropdown(){
    var dropdownContent = document.getElementById('dropdownOptContent');
        dropdownContent.classList.toggle('active');
}

function toggleSideMenu() {
    var optBtns = document.querySelector(".opt-btns");
    optBtns.classList.toggle("open");


    const key = "isThisSideMenuOpen";
    const keyValue = true;
    sessionStorage.setItem(key,keyValue);
    var checkItem = sessionStorage.getItem(key);
    var test = document.getElementById("test");
    if(checkItem){
        test.style.backgroundColor="red";
        sessionStorage.removeItem(key);
    }

    // Dobudować sprawdzanie czy przycisk został naciśnięty
    // Na podstawie tego dokonywać zmiany ikony
    // Warto również spojrzeć na obsługę animacji w tym miejscu

    // var checkItem2 = sessionStorage.getItem(key);
    // if(!checkItem2){
    //     test.style.backgroundColor="green";
    // }
}  