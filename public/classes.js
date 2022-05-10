class Draggable {
    static width = 96;
    static height = 96;

    constructor({ opacity = 0.5}) {
        this.opacity = 0.5;
        this.position = { x: - 100, y : -100};
        this.frames = {max : 1, hold: 10, val: 0, elapsed: 0};
        this.selectedBuilding = null;
        // let buildingData = BUILDING_TYPES[buildingType];
        // console.log(buildingData);
        // this.position = position;
        // this.image = new Image();
        // this.selectedBuilding = buildingType;
        // this.opacity = opacity;
        // this.frames = { max : buildingData.FRAMES_MAX, hold : 10, val : 0, elapsed : 0 };

        // this.image.onload = () => {
        //     this.width = this.image.width / this.frames.max;
        //     this.height = this.image.height;
        // }

        // this.image.src = buildingData.IMAGE_SRC;
    }

    // constructor({ position, image, selectedBuildingType = null, opacity = 0.5, frames = { max: 1, hold: 10 } }) {
    //     this.position = position;
    //     this.image = new Image();
    //     this.selectedBuildingType = selectedBuildingType;
    //     this.opacity = opacity;
    //     this.frames = { ...frames, val: 0, elapsed: 0 }

    //     console.log(this.frames);

    //     this.image.onload = () => {
    //         //this.width = Draggable.width;
    //         //this.height = Draggable.height;
    //         this.width = this.image.width;
    //         this.height = this.image.height;
    //     }

    //     this.image.src = image.src;
    // }

    draw() {
        if (this.selectedBuildingType === null)
            return;

        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
          )

        ctx.restore();
    }

    getBuildingType() {
        return this.selectedBuildingType;
    }

    selectBuilding(buildingType) {
        let buildingData = BUILDING_TYPES[buildingType];
        this.selectedBuildingType = buildingType;
        this.setImage(buildingData.IMAGE_SRC);
        this.frames.max = buildingData
        console.log(buildingData);
        // this.selectedBuilding = building;
        // this.setImage(images[TILE_TYPES[building]])
    }

    setImage(image_src) {
        this.image = new Image();

        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        }

        this.image.src = image_src;
    }
}

class Tile {

    static width = 96
    static height = 96

    constructor({ position, image, opacity = 1.0, isSelected = false, building = null }) {
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
        if (!this.isSelected)
            this.opacity = 1.0;
    }

    mouseOver() {
        if (!this.isSelected)
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

    constructor({position, buildingType}) {
        console.log(BUILDING_TYPES);
        console.log(buildingType);
        let buildingData = BUILDING_TYPES[buildingType];
        console.log(buildingData);
        this.position = position;
        this.image = new Image();
        
        this.frames = { max : buildingData.FRAMES_MAX, hold : 10, val : 0, elapsed : 0 };

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }

        this.image.src = buildingData.IMAGE_SRC;
    }

    // constructor({ position, image, frames = { max: 1, hold: 10 } }) {
    //     this.position = position;
    //     this.image = new Image();
    //     this.frames = { ...frames, val: 0, elapsed: 0 }

    //     this.image.onload = () => {
    //         this.width = this.image.width / this.frames.max;
    //         this.height = this.image.height;
    //     }

    //     this.image.src = image.src
    // }

    getImage() {
        return this.image;
    }

    draw() {
        ctx.save();


        console.log(`Frames: ${JSON.stringify(this.frames)}`);
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
          )
        // ctx.drawImage(
        //     this.image,
        //     this.position.x,
        //     this.position.y,
        //     this.width,
        //     this.height
        // )

        ctx.restore();

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) 
                this.frames.val++
            else 
                this.frames.val = 0
        }
    }
}