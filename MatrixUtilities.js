class Matrix {
  constructor(width, height) {
    this._matrix = [];
    // checks if the matrix is being initalized using arrays of columns or if from width/height dimernsions.
    let arrayInit = true;
    for(let i = 0; i < arguments.length; i++) {
      if(!Array.isArray(arguments[i])) {
        arrayInit = false;
      }
    }

    // if the array is being intialized from an array it simply loads the values into the matrix. Otherwise it creates a width by height matrix with values initialzed to zero.
    if(arrayInit) {
      for(let i = 0; i<arguments.length; i++) {
          this._matrix.push(arguments[i]);
      }
      this._width = this._matrix.length;
      this._height = this._matrix[0].length;
    }
    else if(!arrayInit) {
      for(let j = 0; j<height; j++) {
        let matrixLine = [];
        for(let i = 0; i<width; i++) {
          matrixLine.push(0);
        }
        this._matrix.push(matrixLine);
      }
        this._width = width;
        this._height = height;
    }
  }

  get matrix() {
    return this._matrix;
  }

  getValueAt(i, j) {
    return this._matrix[i][j];
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  setValueAt(i, j, newValue) {
    this._matrix[i][j] = newValue
  }

  static addMatrices(matrix1, matrix2) {
    let newMatrix = new Matrix(2, 2);

    if(matrix1.height !== matrix2.height || matrix1.width !== matrix2.width) {
      return false;
    }
    else {
      let matrixWidth = matrix1.height;
      let matrixHeight = matrix1.width;
      for(let j = 0; j < matrixHeight; j++) {
        for(let i = 0; i < matrixWidth; i++) {
          newMatrix._matrix[i][j] = matrix1._matrix[i][j] + matrix2._matrix[i][j];
        }
      }

      return newMatrix
    }
  }

  static hadamardProduct(matrix1, matrix2) {
    let newMatrix = new Matrix(2, 2);

    if(matrix1.height !== matrix2.height || matrix1.width !== matrix2.width) {
      return false;
    }
    else {
      let matrixWidth = matrix1.height;
      let matrixHeight = matrix1.width;
      for(let j = 0; j < matrixHeight; j++) {
        for(let i = 0; i < matrixWidth; i++) {
          newMatrix._matrix[i][j] = matrix1._matrix[i][j] * matrix2._matrix[i][j];
        }
      }

      return newMatrix
    }    
  }

  static constantMultiplication(matrix, C) {
    let newMatrix = new Matrix(2, 2);

    let matrixWidth = matrix1.height;
    let matrixHeight = matrix1.width;
    for(let j = 0; j < matrixHeight; j++) {
      for(let i = 0; i < matrixWidth; i++) {
        newMatrix._matrix[i][j] = matrix1._matrix[i][j] * C;
      }
    }

    return newMatrix
  }

  // a public method for displaying the matrix as an easy to read matrix string. 
  stringVersion(startPoint = [0, 0], endPoint=[this.width - 1,this.height - 1]) {
    // return false if the cordinates are not arrays or if they are not the proper dimensions OR if the first vector is not to the left/up of the second.
    if(!Array.isArray(startPoint) || !Array.isArray(endPoint) || startPoint.length !== 2 || endPoint.length !== 2 || startPoint[0] < 0 || startPoint[0] > this.width || startPoint[1] < 0 || startPoint[1] > this.height || endPoint[0] < 0 || endPoint[0] > this.width || endPoint[1] < 0 || endPoint[1] > this.height || startPoint[0] > endPoint[0] || startPoint[1] > endPoint[1]) {
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

// let matrix1 = new Matrix([1, 0], [0,1]);
let matrix = new Matrix(2,2);
console.log(matrix.stringVersion());
matrix.setValueAt(0,0, 15);
console.log(matrix.stringVersion());
console.log(matrix.getValueAt(0,0));

// add matrix operators: matrix addition, matrix multiplication, hadamard multiplication, etc...