let voxelDimensions = {
  x: 64,
  y: 64,
  z: 64
}
var vox = new VOX(voxelDimensions.x, voxelDimensions.y, voxelDimensions.z);

class VoxelCube {
  constructor(x = 0, y = 0, z = 0, width = 1, breadth = 1, height = 1, baseColor = 1  , fillMode = "fill") {
    if(this._isPhysical(x + 1) && this._isPhysical(y + 1) && this._isPhysical(z + 1) && this._isPhysical(width) && this._isPhysical(breadth) && this._isPhysical(height) && this._isValidFillMode(fillMode)) {
      this._x = x;
      this._y = y; 
      this._z = z;
      this._width = width;
      this._breadth = breadth;
      this._height = height;
      this._baseColor = baseColor
      this._fillMode = fillMode.toLowerCase();
    }
    else {
      return false;
    }
  }

  get location() {
    return [this._x, this._y, this._z];
  }

  get width() {
    return this._width;
  }

  get breadth() {
    return this._breadth;
  }

  get height() {
    return this._height;
  }

  get baseColor() {
    return this._baseColor;
  }

  get fillMode() {
    return this._fillMode;
  }

  set width(newWidth) {
    this._width = newWidth;
  }

  set breadth(newBreadth) {
    this._breadth = newBreadth;
  }

  set height(newHeight) {
    this._height = newHeight;
  }

  set baseColor(newColor) {
    this._baseColor = newColor;
  }

  set fillMode(newFilledState) {
    if(this._isValidFillMode(newFilledState)) {
      this._fillMode = newFilledState.toLowerCase();
    }
  }

  move(newLocationArray) {
    if(this._isPhysical(newLocationArray[0]) && this._isPhysical(newLocationArray[1]) && this._isPhysical(newLocationArray[2])) {
      this.deconstructCube();

      this._x = newLocationArray[0];
      this._y = newLocationArray[1];
      this._z = newLocationArray[2];

      this.buildCube();
    }
    else {
      return false;
    }
  }

  _isPhysical(num) {
    if(num > 0 && num%1 === 0 && typeof num === 'number') {
      return true;
    }
    else {
      return false;
    }
  }

  _isValidFillMode(newFillMode) {
    newFillMode = newFillMode.toLowerCase();
    if(typeof newFillMode === 'string' && (newFillMode === "fill" || newFillMode === "hollow" || newFillMode === "outline")) {
      return true;
    }
  }

  buildCube() {
    this.deconstructCube();

    for(let deltaX = 0; deltaX < this._width; deltaX++) {
      for(let deltaY = 0; deltaY < this._breadth; deltaY++) {
        for(let deltaZ = 0; deltaZ < this._height; deltaZ++) {
          if(this._fillMode === "fill") {
            vox.setVoxel(this._x + deltaX, this._y + deltaY, this._z + deltaZ, this.baseColor);
          }
          else if(this._fillMode === "hollow") {
            if(deltaX === 0 || deltaX === this._width-1 || deltaY === 0 || deltaY === this._breadth-1 || deltaZ === 0 || deltaZ === this._height-1) {
              vox.setVoxel(this._x + deltaX, this._y + deltaY, this._z + deltaZ, this._baseColor);
            }
          }
          else if(this._fillMode === "outline") {
            if((deltaX === 0 && deltaZ ===0) || (deltaX === this._width-1 && deltaZ === 0) || (deltaY === 0 && deltaZ ===0) || (deltaY === this._breadth-1 && deltaZ === 0) || (deltaX === 0 && deltaZ === this._height - 1) || (deltaX === this._width-1 && deltaZ === this._height - 1) ||(deltaY === 0 && deltaZ === this._height - 1) || (deltaY === this._breadth-1 && deltaZ === this._height - 1) || (deltaX === 0 && deltaY === 0) || (deltaX === 0 && deltaY === this._breadth - 1) || (deltaX === this._width-1 && deltaY === 0) || (deltaX === this._width-1 && deltaY === this._breadth - 1)) {
              vox.setVoxel(this._x + deltaX, this._y + deltaY, this._z + deltaZ, this._baseColor);
            }
          }
        }
      }
    }
  }

  
  deconstructCube() {
    for(let deltaX = 0; deltaX < this._width; deltaX++) {
      for(let deltaY = 0; deltaY < this._breadth; deltaY++) {
        for(let deltaZ = 0; deltaZ < this._height; deltaZ++) {
          vox.setVoxel(this._x + deltaX, this._y + deltaY, this._z + deltaZ, 0);
        }
      }
    }      
  }

}

// add in primatives for pyramids and stairs

class VoxelPyramid {
  constructor(x = 0, y = 0, z = 0, width = 5, breadth = 5, height = 5, baseColor = 1) {
    console.log(this._isPhysical(x + 1) && this._isPhysical(y + 1) && this._isPhysical(z + 1) && this._isPhysical(width)  && this._isPhysical(breadth) && this._isPhysical(height));
    if(this._isPhysical(x + 1) && this._isPhysical(y + 1) && this._isPhysical(z + 1) && this._isPhysical(width)  && this._isPhysical(breadth) && this._isPhysical(height)) {
      this._x = x;
      this._y = y; 
      this._z = z;
      this._width = width;
      this._breadth = breadth;
      this._height = Math.floor((this.width + 1)/2);
      this._baseColor = baseColor;
    }
    else {
      return false;
    }
  }

  get location() {
    return [this._x, this._y, this._z];
  }

  get width() {
    return this._width;
  }

  get breadth() {
    return this._breadth;
  }

  get height() {
    return this._height;
  }

  get baseColor() {
    return this._baseColor;
  }

  set width(newWidth) {
    this._width = newWidth;
  }

  set breadth(newBreadth) {
    this._breadth = newBreadth;
  }

  set height(newHeight) {
    this._height = newHeight;
  }

  set baseColor(newColor) {
    this._baseColor = newColor;
  }

  _isPhysical(num) {
    if(num > 0 && num%1 === 0 && typeof num === 'number') {
      return true;
    }
    else {
      return false;
    }
  }

  buildPyramid() {
    let startingPoint = this.location;
    let currentWidth = this.width;

    for(let deltaZ = 0; deltaZ<this.height; deltaZ++) {
      for(let deltaX = 0; deltaX<currentWidth; deltaX++) {
        for(let deltaY = 0; deltaY<currentWidth; deltaY++) {
          vox.setVoxel(startingPoint[0] + deltaX, startingPoint[1] + deltaY, startingPoint[2] + deltaZ, this.baseColor);
        } 
      }      
      startingPoint[0] += 1;
      startingPoint[1] += 1;
      currentWidth -= 2;
      // if(currentWidth !== 1) {
      //   currentWidth -= 2;  
      // }
    }
  }

}


// let pyramid1 = new VoxelPyramid(0,0,0, 5,5);
let pyramid1 = new VoxelPyramid(0,0,0, 64,64);
console.log(pyramid1);
pyramid1.buildPyramid();