const compose = (...functions) => x => functions.reduceRight((acc, fn) => fn(acc), x);

const getMousePosition = function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return new Position(x, y);
}

const getTileIndexByCoordinates = function(position) {
    let x = Math.floor(position.x / Tile.width)
    let y = Math.floor(position.y / Tile.height)
    let tilesPerRow = map[0].length;

    let index = -1
    if(x >= maxHorizontal || y >= maxVertical) {
        return index;
    }

    index = y * tilesPerRow + x;
    return index;
}
