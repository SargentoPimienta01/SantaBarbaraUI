document.addEventListener('DOMContentLoaded', () => {
    if (!document.startViewTransition) return;

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                event.preventDefault();
                
                document.startViewTransition(async () => {
                    const response = await fetch(href);
                    const html = await response.text();

                    document.querySelector('#main-content').innerHTML = new DOMParser()
                        .parseFromString(html, 'text/html')
                        .querySelector('#main-content').innerHTML;

                    history.pushState(null, '', href);
                });
            }
        });
    });
});
