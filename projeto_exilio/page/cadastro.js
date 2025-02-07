

document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    let angle = 0;

    function animateBackground() {
        angle = (angle + 2) % 360; // Aumentei a velocidade da animação
        const x = Math.sin(angle * Math.PI / 180) * 50; // Movimento horizontal mais amplo
        const y = Math.cos(angle * Math.PI / 180) * 50; // Movimento vertical mais amplo

        // Aplica o efeito com uma transição suave
        body.style.backgroundPosition = `${x}px ${y}px`;
        body.style.transition = 'background-position 0.1s linear'; // Suaviza o efeito

        requestAnimationFrame(animateBackground);
    }

    animateBackground();
});




