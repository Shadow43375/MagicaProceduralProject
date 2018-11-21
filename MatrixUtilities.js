class Matrix {
  constructor() {
    this._matrix = [];
    for(let i = 0; i<arguments.length; i++) {
      if(Array.isArray(arguments[i])) {
        this._matrix.push(arguments[i]);
      }
    }
  }

  stringVersion(startPoint, endPoint) {
    if(!Array.isArray(startPoint) || !Array.isArray(endPoint) || startPoint.length !== 2 || endPoint.length !== 2) {
      return false
    }
    else {
      let strMatrix = ""
      endPoint[0]++;
      endPoint[1]++;

      for(let j = startPoint[1]; j<endPoint[1]; j++) {
        for(let i = startPoint[0]; i<endPoint[0]; i++) {
          console.log("testing point (" + i + "," + j + ")");
          let greatestInColumn = this._getGreatestInColumn(this._matrix[i])
          let paddingSpace = this._getPaddingSpace(greatestInColumn.value, this._matrix[i][j]);
          
          // special condition for if sub matrix is a column but not at end of matrix.
          if(startPoint[0] === (endPoint[0]-1) && j !== endPoint[1] - 1) {
            strMatrix = strMatrix + "|" + this._matrix[i][j].toString() + "|\n"
          }
          // special condition for if sub matrix is a column and END of matrix.
          else if(startPoint[0] === (endPoint[0]-1) && j === endPoint[1] - 1) {
            strMatrix = strMatrix + "|" + this._matrix[i][j].toString() + "|"
          }

          // start of new matrix
          else if(i === startPoint[0] && j === startPoint[1]) {
            strMatrix = "|" + paddingSpace + strMatrix + this._matrix[i][j].toString();
          }
          // elements in middle of matrix
          else if(i !== startPoint[0] && i !== endPoint[0] - 1) {
            console.log("element hanging in middle");
            strMatrix = strMatrix + ", " + paddingSpace + this._matrix[i][j].toString();
          }
          // elements at the start of a new line in the matrix
          else if(i === startPoint[0] && j !== startPoint[1]) {
            console.log("new matrix LINE");
            strMatrix = strMatrix + "|" + paddingSpace +  + this._matrix[i][j].toString();
          }
          // the end of a line
          else if(i === endPoint[0]  - 1 && j !== endPoint[1] - 1) {
            console.log("end of a line.");
            strMatrix = strMatrix + ", " + paddingSpace + this._matrix[i][j].toString() + "|\n";
          }
          else if(i === endPoint[0]  - 1 && j === endPoint[1] - 1) {
            console.log("end of a MATRIX.");
            strMatrix = strMatrix + ", " + paddingSpace + this._matrix[i][j].toString() + "|";
          }
        }
      }
      
      return strMatrix;
    }
  }

  _getGreatestInColumn(column) {
    let greatestYet = {
      value: column[0],
      index: 0
    }

    for(let j = 0; j<column.length; j++) {
      if(column[j] > greatestYet.value) {
        greatestYet.value = column[j];
        greatestYet.index = j;
      }
    }

    return greatestYet;
  }

  _getPaddingSpace(greatestNum, thisNum) {
    let neededSpaces = greatestNum.toString().length - thisNum.toString().length;
    let spaces= "";

    for(let i = 0; i<neededSpaces; i++) {
      spaces = spaces + " ";
    }

    return spaces;
  }

}

let matrix = new Matrix([111,0], [0,2], [11, 333220]);
console.log(matrix.stringVersion([0,0], [2,1]));
console.log(matrix.stringVersion([1, 0], [1,1]));

// need to add feature to get string sub array
// add getter and setter functions for changing array values and adding and removing rows and columns
// add matrix operators: matrix addition, matrix multiplication, hadamard multiplication, etc...