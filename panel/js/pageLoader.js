window.addEventListener('load', function() {
    this.setTimeout(function() {
        const pageloader = document.getElementById('pageloader');
        pageloader.style.display = 'none';
      
        const nav = document.getElementsByTagName('nav')[0];
        const header = document.getElementsByTagName('header')[0];
        const main = document.getElementsByTagName('main')[0];
        nav.style.display = 'flex';
        header.style.display = 'flex';
        main.style.display = 'flex';
    }, 5000);
});