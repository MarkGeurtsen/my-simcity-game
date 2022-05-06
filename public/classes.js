class Draggable {
    static width = 96;
    static height = 96;

    constructor({ position, image, selectedBuilding = null, opacity = 0.5}) {
        this.position = position;
        this.image = new Image();
        this.selectedBuilding = selectedBuilding;
        this.opacity = opacity;
        
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        }

        this.image.src = image.src;   
    }

    draw() {
        if(this.selectedBuilding === null)
            return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        ctx.restore();
    }

    selectBuilding(building) {
        this.selectedBuilding = building;
        this.setImage(images[TILE_TYPES[building]])
    }

    setImage(image) {

        console.log(image);
        this.image = new Image();

        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        }

        this.image.src = image.src;
    }
}

class Tile {

    static width = 96
    static height = 96

    constructor({ position, image, opacity = 1.0, isSelected = false, building = null}) {
        this.position = position
        this.image = new Image();
        this.opacity = opacity;

        this.image.onload = () => {
            this.width = this.image.width
            this.height = this.image.height
        }

        this.building = building;

        this.image.src = image.src
        this.isSelected = isSelected;
    }

    unselect() {
        this.isSelected = false;
        this.opacity = 1.0;
    }

    setSelected() {
        this.isSelected = true;
        this.opacity = 0.6;
    }

    mouseOut() {
        if(!this.isSelected)
            this.opacity = 1.0;
    }

    mouseOver() {
        if(!this.isSelected)
            this.opacity = 0.8;
    }

    changeImage(image) {
        this.image = new Image();

        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        }

        this.image.src = image.src;
    }

    setBuilding(building) {
        this.building = building;

        this.changeImage(building.getImage());
    }

    getBuilding() {
        return this.building;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        ctx.restore();
        
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#ccc';
        
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Position {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Building {

    constructor(image, frames = { max: 1, hold: 10 }) {
        this.image = new Image();
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.image.src = image.src
    }

    getImage() {
        return this.image;
    }
}