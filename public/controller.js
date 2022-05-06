





const compose = (...functions) => x => functions.reduceRight((acc, fn) => fn(acc), x);

let selectedTileIndex = -1;
let mouseOverTileIndex = -1;

let isMouseDown = false;
let isDraggingBuilding = false;

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

const setSelectedTile = function(tileIndex) {
    if(selectedTileIndex !== - 1)
        tiles[selectedTileIndex].unselect();

    if(tileIndex < 0) {
        return;
    }
    selectedTileIndex = tileIndex;
    tiles[selectedTileIndex].setSelected();
}

const setMouseOverTile = function(tileIndex) {
    if(mouseOverTileIndex !== -1 && tileIndex !== mouseOverTileIndex) {
        tiles[mouseOverTileIndex].mouseOut();
    }

    if(tileIndex < 0) {
        return;
    }

    mouseOverTileIndex = tileIndex;
    tiles[mouseOverTileIndex].mouseOver();
}

const getSelectedTile = function() {
    return tiles[selectedTileIndex];
}

// const createBuilding = function() {
//     let building = new Building(images[TILE_TYPES.HOUSE]);
//     return building;
// }

// const decideMouseAction = event => {
//     let mousePosition = getMousePosition(event);
//     console.log(mousePosition);
//     if(getTileIndexByCoordinates(mousePosition) < 0) {
//         isDraggingBuilding = true;
//         // not a tile select. so let's say a building :)
//         console.log('building');
//     }
// }

const updateDraggablePosition = event => {
    let mousePosition = getMousePosition(event);
    let mouseOverTileIndex = getTileIndexByCoordinates(mousePosition);

    if(mouseOverTileIndex < 0)
        return;
    
    draggable.position = tiles[mouseOverTileIndex].position;
}

const mouseUpAction = event => {
    isMouseDown = false;
    isDraggingBuilding = false;
    // if dragging, stop.
}

//compose(setSelectedTile, getTileIndexByCoordinates, getMousePosition)
const clickTileAction = function(event) {
    let tileIndex = compose(getTileIndexByCoordinates, getMousePosition)(event);
    let tile = tiles[tileIndex];
    if(draggable.selectedBuilding) {

    } else {
        setSelectedTile()
    }
}
const mouseOverTileAction = compose(setMouseOverTile, getTileIndexByCoordinates, getMousePosition);

const addHouseToTile = function() {
    if(selectedTileIndex === -1)
        return;
        
    let house = createBuilding();
    let targetTile = tiles[selectedTileIndex];
    targetTile.setBuilding(house);
}

const buildingClickAction = button => () => {
    let buildingType = button.dataset.buildingType;
    draggable.selectBuilding(buildingType);
};

Array.from(document.querySelectorAll("div.building")).forEach(buildingButton => {
    let action = buildingClickAction(buildingButton);
    buildingButton.addEventListener('mousedown', action);
})

// canvas.addEventListener('mousedown', event => {
//     if(draggable) {
//         // build building on tile that is currently selected.

//     }
// });

canvas.addEventListener('mousedown', event => clickTileAction(event));
//canvas.addEventListener('mousedown', event => decideMouseAction(event));
canvas.addEventListener('mouseup', mouseUpAction);


window.addEventListener('keydown', event => {
    switch(event.key) {
        case 'h':
            addHouseToTile();
    }
})

canvas.addEventListener("mousemove", event => updateDraggablePosition(event));

