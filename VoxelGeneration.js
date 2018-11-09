function generateHeightMap(x, y, z) {
  heightMapRow = [];
  heightMapColumn = []
  let num = 0;
  for(let j = 0; j < y; j++) {
    for(let i = 0; i < x; i++){  
      // heightMapRow.push(Math.round(PRNG.generateNewNumber(true)*(z)));
      heightMapRow.push(Math.round(Math.random()*(z+1)));
      num++
    }
    heightMapColumn.push(heightMapRow);
    heightMapRow = [];
  }
  return heightMapColumn;
}

function generateTerrain(heightMap, fillType ="solid") {
  for(let j = 0; j< heightMap.length; j++) {
    for(let i = 0; i< heightMap[0].length; i++) {
      if(fillType === "hollow") {
        vox.setVoxel(i, j, heightMap[j][i], 1);      
      }
      else if(fillType === "solid") {
        for(let k = 0; k < heightMap[j][i]; k++) {
          vox.setVoxel(i, j, k, 1);
        }
      }
    }
  }
}

//example of how to use 
var vox = new VOX(64, 1, 10);
generateTerrain(generateHeightMap(vox.X,vox.Y, vox.Z));  