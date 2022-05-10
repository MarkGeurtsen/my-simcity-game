// Setup the draggable building object.

const draggable = new Draggable({position : { x: -200, y: -200}, building_type: "FACTORY", opacity: 0.5});

// Initiate empty array for map.
const tiles = [];
const buildings = tiles.map( _ => 0);

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

const addBuilding = (building) => {
    let tileIndex = getTileIndexByCoordinates({x : building.position.x, y: building.position.y});
    buildings[tileIndex] = building;
}

let selectedTileIndex = -1;
let mouseOverTileIndex = -1;

let isMouseDown = false;
let isDraggingBuilding = false;