/* 
 * Constants that define what type of tile is on the map
*/ 

const TILE_TYPES = {
    "EMPTY_TILE" : 0,
    "WATER_TILE" : 1,
    "ROAD_TILE" : 2,
    "HOUSE" : 64,
    "FACTORY" : 65
}

/*
    Loading images.
*/

const emptyTileImage = new Image();
const waterTileImage = new Image();
const roadTileImage = new Image();
const houseImage = new Image();
const factoryImage = new Image();

emptyTileImage.src = './img/empty_tile.png';
waterTileImage.src = './img/water_tile.png';
roadTileImage.src = './img/road_tile.png';
houseImage.src = './img/house_tile.png';
factoryImage.src = './img/factory_tile_sprite.png';

const images = {};
images[TILE_TYPES.EMPTY_TILE] = emptyTileImage;
images[TILE_TYPES.WATER_TILE] = waterTileImage;
images[TILE_TYPES.ROAD_TILE] = roadTileImage;
images[TILE_TYPES.HOUSE] = houseImage;
images[TILE_TYPES.FACTORY] = factoryImage;



const BUILDING_TYPES = {
    "FACTORY" : {
        TILE_WIDTH : 1,
        TILE_HEIGHT: 1,
        FRAMES_MAX : 4,
        IMAGE_SRC : './img/factory_tile_sprite.png'
    },
    "HOUSE" : {
        TILE_WIDTH : 1,
        TILE_HEIGHT : 1,
        FRAMES_MAX : 1,
        IMAGE_SRC : './img/house_tile.png'
    }
}