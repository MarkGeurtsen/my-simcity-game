
const setSelectedTile = function(tileIndex) {
    if(selectedTileIndex !== - 1)
        tiles[selectedTileIndex].unselect();

    if(tileIndex < 0) {
        return;
    }
    selectedTileIndex = tileIndex;
    let tile = tiles[selectedTileIndex];
    console.log(tileIndex);
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

const updateDraggablePosition = event => {
    let mousePosition = getMousePosition(event);
    let mouseOverTileIndex = getTileIndexByCoordinates(mousePosition);

    if(mouseOverTileIndex < 0)
        return;

    draggable.position = tiles[mouseOverTileIndex].position;
    
    // draggable.position = tiles[mouseOverTileIndex].position;
    // draggable.frames.max = 4;
}

const clickTileAction = function(event) {
    let tileIndex = compose(getTileIndexByCoordinates, getMousePosition)(event);
    let tile = tiles[tileIndex];
    if(draggable.selectedBuilding) {
        // can build?
    } else {
        setSelectedTile(tileIndex);
    }
}

const mouseUpAction = function() {
    // find where this event took place. on a tile?
    let tileIndex = compose(getTileIndexByCoordinates, getMousePosition)(event);
    let buildingType = draggable.getBuildingType();
    let building = new Building({position: draggable.position, buildingType : buildingType});
    //let buildingType = draggable.
    //let building = new Building({position : draggable.position, image: draggable.image, frames: {max : 4, hold: 10}});
    //let building = new Building({draggable.position, draggable.image})
    if(tileIndex < 0 || building === null)
        return;

    addBuilding(building, tileIndex);
}

const mouseOverTileAction = compose(setMouseOverTile, getTileIndexByCoordinates, getMousePosition);

const buildingClickAction = button => () => {
    let buildingType = button.dataset.buildingType;
    draggable.selectBuilding(buildingType);
};

/* Event listener setup */

Array.from(document.querySelectorAll("div.building")).forEach(buildingButton => {
    let action = buildingClickAction(buildingButton);
    buildingButton.addEventListener('mousedown', action);
})

canvas.addEventListener('mousedown', event => clickTileAction(event));
canvas.addEventListener('mouseup', event => mouseUpAction(event));
window.addEventListener('keydown', event => {
})

canvas.addEventListener("mousemove", event => updateDraggablePosition(event));

