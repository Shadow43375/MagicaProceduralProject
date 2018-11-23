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
      for(let i = 0; i<width; i++) {
        let matrixLine = [];
        for(let j = 0; j<height; j++) {
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

  // class method for adding matrices element wise
  static addMatrices(matrix1, matrix2)  {
    let matrixWidth = matrix1.width;
    let matrixHeight = matrix1.height;
    var newMatrix = new Matrix(matrixWidth, matrixHeight);  

    if(matrix1.height !== matrix2.height || matrix1.width !== matrix2.width) {
      return false;
    }
    else {
      for(let j = 0; j < matrixHeight; j++) {
        for(let i = 0; i < matrixWidth; i++) {    
          newMatrix._matrix[i][j] = matrix1._matrix[i][j] + matrix2._matrix[i][j];
        }
      }

      return newMatrix
    }    
  }

  static multiplyMatrices(matrix1, matrix2) {
    
    if(matrix1.width !== matrix2.height) {
      return false;
    }


  }

  // class method for find the matrix product element wise
  static hadamardProduct(matrix1, matrix2) {
    let matrixWidth = matrix1.width;
    let matrixHeight = matrix1.height;
    var newMatrix = new Matrix(matrixWidth, matrixHeight);  

    if(matrix1.height !== matrix2.height || matrix1.width !== matrix2.width) {
      return false;
    }
    else {
      for(let j = 0; j < matrixHeight; j++) {
        for(let i = 0; i < matrixWidth; i++) {    
          newMatrix._matrix[i][j] = matrix1._matrix[i][j] * matrix2._matrix[i][j];
        }
      }

      return newMatrix
    }    
  }

  // class method for multiplying a matrix by a constant
  static constantMultiplication(matrix, C) {
    let matrixWidth = matrix1.width;
    let matrixHeight = matrix1.height;
    let newMatrix = new Matrix(matrixWidth, matrixHeight);

    for(let j = 0; j < matrixHeight; j++) {
      for(let i = 0; i < matrixWidth; i++) {
        newMatrix._matrix[i][j] = matrix1._matrix[i][j] * C;
      }
    }

    return newMatrix
  }

  // class method returns new matrix which is the transpose of the input matrix.
  static transpose(matrix) {
    let matrixWidth = matrix.height;
    let matrixHeight = matrix.width;
    let newMatrix = new Matrix(matrixWidth, matrixHeight);

    for(let j = 0; j < matrixHeight; j++) {
      for(let i = 0; i < matrixWidth; i++) {
        newMatrix.matrix[i][j] = matrix._matrix[j][i];
      }
    }

    return newMatrix
  }

  // swaps the columns in the matrix
  swapColumns(columnA, columnB) {
    // checks to make sure that the columns specified in the argument actually exist. If NOT then returns false. Else if continues with the swap operation.
    if(columnA < 0 || columnB < 0 || columnA > this.width || columnB > this.width) {
      return false;
    }
    else {
      // creates a copy of the columnA so that it is not overwritten during the swap.
      let columnABuffer = []
      for(let j = 0; j < this.height; j++) {
        columnABuffer.push(this.matrix[columnA][j]);
      }

      // overwrites the values columnA with the values from columnB
      for(let j = 0; j < this.height; j++) {
        this.matrix[columnA][j] = this.matrix[columnB][j];
      }
      // overwrite the values from columnB with columnA
      for(let j = 0; j < this.height; j++) {
        this.matrix[columnB][j] = columnABuffer[j];
      }

      return true;
    }
  }

  // swaps the rows in the matrix
  swapRows(rowA, rowB) {
    // checks to make sure that the rows specified in the argument actually exist. If NOT then returns false. Else if continues with the swap operation.
    if(rowA < 0 || rowB < 0 || rowA > this.height || rowB > this.height) {
      return false;
    }
    else {
      // creates a copy of the rowA so that it is not overwritten during the swap.
      let rowABuffer = []
      for(let i = 0; i < this.width; i++) {
        rowABuffer.push(this.matrix[i][rowA])
      }

      // overwrites the values rowA with the values from columnB
      for(let i = 0; i < this.width; i++) {
        this.matrix[i][rowA] = this.matrix[i][rowB];
      }
     // overwrite the values from columnA with columnB
      for(let i = 0; i < this.width; i++) {
        this.matrix[i][rowB] = rowABuffer[i];
      }

      return true;
    }
  }



  // a public method for displaying the matrix as an easy to read matrix string. 
  stringVersion(startPoint = [0, 0], endPoint=[this.width - 1, this.height - 1]) {


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
      // console.log(startPoint);
      // console.log(endPoint);

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
      identity: column[0],
      value: column[0].toString().length,
      index: 0
    }

    for(let j = 0; j<column.length; j++) {
      // console.log(column[j] + " length = " + column[j].toString().length);
      // console.log("column[j].toString().length > greatestYet.value = ");
      // console.log(column[j].toString().length > greatestYet.value);
      if(column[j].toString().length > greatestYet.value) {
        // console.log("column[j] = " + column[j]);
        greatestYet.identity = column[j];
        // console.log("greatestYet.identity = " + greatestYet.identity);
        greatestYet.value = column[j].toString().length;
        // console.log("greatestYet.value= " + greatestYet.value);
        greatestYet.index = j;
      }
    }

    return greatestYet;
  }


  // a private method for finding out how much space should be placed before a number to ensure the uniform size of each matrix element for display purposes
  _getPaddingSpace(greatestNum, thisNum) {
    let neededSpaces = greatestNum - thisNum.toString().length;
    let spaces= "";

    for(let i = 0; i<neededSpaces; i++) {
      spaces = spaces + " ";
    }

    return spaces;
  }

}

let matrix1 = new Matrix([3, -2],[1, 0], [2, 5]);
console.log(matrix1.stringVersion());
// console.log(Matrix.transpose(matrix1).stringVersion());

// add matrix operators: matrix addition, matrix multiplication, hadamard multiplication, etc...