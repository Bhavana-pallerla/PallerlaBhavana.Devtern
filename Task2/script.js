
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

       
        const container = this.closest('.container');
        const message = document.createElement('p');
        message.textContent = 'Processing your purchase...';
        container.appendChild(message);

       
        setTimeout(() => {
            message.textContent = 'Purchase successful!';
        }, 2000);
    });
});
