function generateHeightMap(x, y, z) {
  let numberOfPeaks = 1;
  let numberOfSamples = x - 1;
  heightMapRow = [];
  heightMapColumn = []
  let sinObject = new TrigFunction('abssine', 1, 0, 0);
  let trigSeriesObject = new TrigSeries(sinObject);
  let trigSeries = trigSeriesObject.getSeries(numberOfSamples, 0, numberOfPeaks*Math.PI);
  console.log(trigSeries);
  let num = 0;

  for(let j = 0; j < y; j++) {
    for(let i = 0; i < x; i++){  
      heightMapRow.push(parseInt(trigSeries[i]*(z+1)));
      num++
    }
    heightMapColumn.push(heightMapRow);
    heightMapRow = [];
  }

  console.log(heightMapColumn);
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

// function generateTerrainAt(heightMap, x, y, fillType ="solid") {
//   for(let j = y; j< heightMap.length; j++) {
//     for(let i = x; i< heightMap[0].length; i++) {
//       if(fillType === "hollow") {
//         vox.setVoxel(i, j, heightMap[j][i], 1);      
//       }
//       else if(fillType === "solid") {
//         for(let k = 0; k < heightMap[j][i]; k++) {
//           vox.setVoxel(i, j, k, 1);
//         }
//       }
//     }
//   }
// }

//example of how to use 
// var vox = new VOX(64, 64, 32);
// generateTerrain(generateHeightMap(vox.X,vox.Y, vox.Z));  
// generateTerrain([[3,3,3],[3,3,3],[3,3,3]]);