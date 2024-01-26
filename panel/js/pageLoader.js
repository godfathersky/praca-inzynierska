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
              
                const test1 = document.getElementById('test1');
                const test2 = document.getElementById('test2');
                const test3 = document.getElementById('test3');
                const test4 = document.getElementById('test4');

                test1.style.display = 'flex';
                test2.style.display = 'flex';
                test3.style.display = 'flex';
                test4.style.display = 'flex';
            }, 1000);
        }
    }

    updateProgress();
});