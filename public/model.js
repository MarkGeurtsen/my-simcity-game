// Setup the draggable building object.

const draggable = new Draggable({position : { x: -200, y: -200}, image: images[TILE_TYPES.HOUSE]});

// Initiate empty array for map.
const tiles = [];

// Loop over map object and set tiles.
(function drawMap() {
    map.forEach( (_, i) => {
        map[i].forEach((symbol, j) => {
            let tile = new Tile({
                position: {
                    x : j * Tile.width,
                    y : i * Tile.height
                },
                image: images[symbol]
            })
            tiles.push(tile)
        })
    })
})();