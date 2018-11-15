let voxelDimensions = {
  x: 64,
  y: 64,
  z: 64
}
var vox = new VOX(voxelDimensions.x, voxelDimensions.y, voxelDimensions.z);

class VoxelCube {
  constructor(x = 0, y = 0, z = 0, width = 1, breadth = 1, height = 1, baseColor = "white", fillMode = "fill") {
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
            vox.setVoxel(this._x + deltaX, this._y + deltaY, this._z + deltaZ, 1);
          }
          else if(this._fillMode === "hollow") {
            if(deltaX === 0 || deltaX === this._width-1 || deltaY === 0 || deltaY === this._breadth-1 || deltaZ === 0 || deltaZ === this._height-1) {
              vox.setVoxel(this._x + deltaX, this._y + deltaY, this._z + deltaZ, 36);
            }
          }
          else if(this._fillMode === "outline") {
            if((deltaX === 0 && deltaZ ===0) || (deltaX === this._width-1 && deltaZ === 0) || (deltaY === 0 && deltaZ ===0) || (deltaY === this._width-1 && deltaZ === 0) || (deltaX === 0 && deltaZ === this._height - 1) || (deltaX === this._width-1 && deltaZ === this._height - 1) ||(deltaY === 0 && deltaZ === this._height - 1) || (deltaY === this._breadth-1 && deltaZ === this._height - 1) || (deltaX === 0 && deltaY === 0) || (deltaX === 0 && deltaY === this._breadth - 1) || (deltaX === this._width-1 && deltaY === 0) || (deltaX === this._width-1 && deltaY === this._breadth - 1)) {
              vox.setVoxel(this._x + deltaX, this._y + deltaY, this._z + deltaZ, 256-33);
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


let cube1 = new VoxelCube(0,0,0,voxelDimensions.x,voxelDimensions.y,voxelDimensions.z, "white", "outline");
console.log(cube1)
cube1.buildCube();

//need to implement totally holey mode in addition to fill and hollow
// add in primatives for pyramids and stairs