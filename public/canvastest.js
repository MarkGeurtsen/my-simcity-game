const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white'
ctx.fillRect(0,0, canvas.width, canvas.height)


function animate() {

    window.requestAnimationFrame(animate);

    drawFrame();
}

function drawFrame() {
    
    
    ctx.fillStyle = '#0c0';
    ctx.fillRect(100, 100, 200, 200);
    
    ctx.fillStyle = '#f00';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(200, 200, 200, 200);
    
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#0c0';
    ctx.fillRect(500, 500, 200, 200);
}

animate();