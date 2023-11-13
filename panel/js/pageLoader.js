window.addEventListener('load', function() {
    const loadingTime = 5000;
    const progressText = document.getElementById('spanLoaderPercent');
    let startTime = Date.now();

    function updateProgress() {
        let elapsedTime = Date.now() - startTime;
        let progress = Math.min((elapsedTime / loadingTime) * 100, 100);
        progressText.textContent = progress.toFixed(0) + '%';

        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        }
        else {
            this.setTimeout(function() {
                const pageLoader = document.getElementById('pageLoader');
                pageLoader.style.display = 'none';
              
                const nav = document.getElementsByTagName('nav')[0];
                const header = document.getElementsByTagName('header')[0];
                const main = document.getElementsByTagName('main')[0];
                nav.style.display = 'flex';
                header.style.display = 'flex';
                main.style.display = 'flex';
            }, 1000);
        }
    }

    updateProgress();
});