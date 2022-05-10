const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const maxHorizontal = map[0].length;
const maxVertical = map.length;

function drawBackground() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0, canvas.width, canvas.height)
}

(function animate() {

    const animationId = window.requestAnimationFrame(animate)
    drawBackground();
    tiles.forEach(tile => tile.draw());
    if(draggable.selectedBuilding) {
        draggable.draw();
    }
    //console.log(buildings);
    Object.values(buildings)
        .filter(building => building !== 0)
        .forEach(building => building.draw())
})();