class Matrix {
  constructor() {
    this._matrix = [];
    for(let i = 0; i<arguments.length; i++) {
      if(Array.isArray(arguments[i])) {
        this._matrix.push(arguments[i]);
      }
    }
  }

  // a public method for displaying the matrix as an easy to read matrix string.
  stringVersion(startPoint, endPoint) {
    // return false if the cordinates are not arrays or if they are not the proper dimensions.
    if(!Array.isArray(startPoint) || !Array.isArray(endPoint) || startPoint.length !== 2 || endPoint.length !== 2) {
      return false
    }
    // proceed with the method if the above safety check is passed
    else {
      // initialize strMatrix variable which will store the string version of the matrix.
      let strMatrix = ""
      //increment the end points by one to ensure that they function like .length for an array while allowing the user to use conventional 0 starting cordinates.
      endPoint[0]++;
      endPoint[1]++;

      // convert each element of the matrix into a string and fit into text with proper padding, parsing, and notation.
      for(let j = startPoint[1]; j<endPoint[1]; j++) {
        for(let i = startPoint[0]; i<endPoint[0]; i++) {
          // figure out the greatest number in the column so as to ensure that proper padding can make decimal places align.
          let greatestInColumn = this._getGreatestInColumn(this._matrix[i])
          // apply padding (if any)
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
            strMatrix = strMatrix + ", " + paddingSpace + this._matrix[i][j].toString();
          }
          // elements at the start of a new line in the matrix
          else if(i === startPoint[0] && j !== startPoint[1]) {
            strMatrix = strMatrix + "|" + paddingSpace +  + this._matrix[i][j].toString();
          }
          // the end of a line
          else if(i === endPoint[0]  - 1 && j !== endPoint[1] - 1) {
            strMatrix = strMatrix + ", " + paddingSpace + this._matrix[i][j].toString() + "|\n";
          }
          else if(i === endPoint[0]  - 1 && j === endPoint[1] - 1) {
            strMatrix = strMatrix + ", " + paddingSpace + this._matrix[i][j].toString() + "|";
          }
        }
      }
      
      return strMatrix;
    }
  }

  // private method for finding the greatest element in a column. Used for figuring out how much space should be placed before each element in the matrix.
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


  // a private method for finding out how much space should be placed before a number to ensure the uniform size of each matrix element for display purposes
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

// need to add in safety features for getting sub array
// add getter and setter functions for changing array values and adding and removing rows and columns
// add matrix operators: matrix addition, matrix multiplication, hadamard multiplication, etc...