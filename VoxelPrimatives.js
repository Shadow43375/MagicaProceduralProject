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
  constructor(x = 0, y = 0, z = 0, width = 5, breadth = 5, baseColor = 1, pointy = false) {
    if(this._isPhysical(x + 1) && this._isPhysical(y + 1) && this._isPhysical(z + 1) && this._isPhysical(width)  && this._isPhysical(breadth) && typeof pointy === 'boolean') {
      this._x = x;
      this._y = y; 
      this._z = z;
      this._width = width;
      this._breadth = breadth;
      this._extraHeight = undefined;
      if(this.width === this.breadth) {
        this.pointyMode = false;
      }
      else if(this.width !== this.breadth) {
        this.pointyMode = pointy;
      }
      //need to modify height formula so as to work in the case of pointy mode. Should place WHOLE thing inside of a getter function so as to improve readability...
        if(this._getLesserofTwo(this.width, this._breadth)) {
          this._height = Math.floor((this._getLesserofTwo(this.width, this._breadth) + 1)/2);
        }
        else {
          this._height = Math.floor((this.width + 1)/2);
        }

        if(this.pointyMode) {
          // extra height for the points...
          this._extraHeight = (this._getGreaterOfTwo(this._width, this._breadth) - 2*(this.height-1))/2 - 1
          this.height = this.height + this._extraHeight;
        }

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

  get pointyMode() {
    return this._pointy;
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

  set pointyMode(newPointyMode) {
    this._pointy = newPointyMode
  }

  _isPhysical(num) {
    if(num > 0 && num%1 === 0 && typeof num === 'number') {
      return true;
    }
    else {
      return false;
    }
  }

  _getGreaterOfTwo(a, b) {
    if(a - b === 0) {
      return false;
    }
    else if(a - b > 0) {
      return a;
    }
    else if(a - b < 0) {
      return b;
    }
  }

  _getLesserofTwo(a,b) {
    if(a - b === 0) {
      return false;
    }
    else if(a - b > 0) {
      return b;
    }
    else if(a - b < 0) {
      return a;
    }    
  }

  buildPyramid() {
    let startingPoint = this.location;
    let greaterDimension = this._getGreaterOfTwo(this.width, this.breadth);
    let currentWidth = this.width;
    let currentBreadth = this.breadth;
    let currentHeight = 0;
    let heightOfBase = this.height;
    if(typeof this._extraHeight !== "undefined") {
      heightOfBase -= this._extraHeight;
    }

    for(let deltaZ = 0; deltaZ<heightOfBase; deltaZ++) {
      for(let deltaX = 0; deltaX<currentWidth; deltaX++) {
        for(let deltaY = 0; deltaY<currentBreadth; deltaY++) {
          vox.setVoxel(startingPoint[0] + deltaX, startingPoint[1] + deltaY, startingPoint[2] + deltaZ, this.baseColor);
        } 
      }      
      startingPoint[0] += 1;
      startingPoint[1] += 1;
      currentWidth -= 2;
      currentBreadth -= 2;
      currentHeight++;
    }

    if(this.pointyMode && greaterDimension) {
      let remainingWidth = this._getGreaterOfTwo(currentWidth, currentBreadth);
      if(this._getGreaterOfTwo(currentWidth, currentBreadth) === currentWidth){
        while(remainingWidth > 0) {
          for(let deltaX = 0; deltaX<remainingWidth; deltaX++) {
            vox.setVoxel(startingPoint[0] + deltaX, startingPoint[1] - 1, currentHeight, this.baseColor);
          }
          startingPoint[0] += 1;
          remainingWidth -= 2;
          currentHeight++;
        }
      }
      else if(this._getGreaterOfTwo(currentWidth, currentBreadth) === currentBreadth) {
        while(remainingWidth > 0) {
          for(let deltaY = 0; deltaY<remainingWidth; deltaY++) {
            vox.setVoxel(startingPoint[0] - 1, startingPoint[1] + deltaY, currentHeight, this.baseColor);
          }
          startingPoint[1] += 1;
          remainingWidth -= 2;
          currentHeight++;
        }
      }
    }
  }

}


let pyramid1 = new VoxelPyramid(15,15,0, 3, 8, 1, false);
// let pyramid1 = new VoxelPyramid(15,15,0, 8, 3, 1, false);
console.log(pyramid1);
pyramid1.buildPyramid();

// make sure to modify height function so that 1) it works when pointy mode is active and 2) so that it works when changing the dimensions of the pyramid when using the setter functions.