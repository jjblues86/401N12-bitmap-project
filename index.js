'use strict';

const fs = require('fs');


// Need to create a bitmap object divided into arrays: header, width, height, color planes, pixels per bit, color pixels66


/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */


function Bitmap(filePath) {
    this.file = filePath;
};


/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */

Bitmap.prototype.parse = function(buffer) {

    this.buffer = buffer;
    this.type = buffer.toString('utf-8', 0, 2);
    this.size = buffer.readUInt32LE(2);
    this.pixelDataStart = buffer.readUInt32LE(10);
    this.dibHeaderSize  = buffer.readUInt32LE(14);
    this.width = buffer.readUInt32LE(18);
    this.height = buffer.readUInt32LE(22);
    this.bitDepth = buffer.readUInt16LE(28);
    this.compressMeth = buffer.readUInt32LE(30);
    this.numberColors = buffer.readUInt32LE(46);
    this.pixelData = buffer.slice(1078, buffer.length);
    this.colorTable = buffer.slice(54, 1078);
    return this;
    //... and so on

};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */

Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation](this);
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

// /**
//  * Sample Transformer (greyscale)
//  * Would be called by Bitmap.transform('greyscale')
//  * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
//  * @param bmp
//  */

const transformGreyscale = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);

  //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

  //TODO: alter bmp to make the image greyscale ...
  // const newBmp = new Buffer(bmp);


};

const doTheInversion = (bmp) => {

    bmp = {};
};

// /**
//  * A dictionary of transformations
//  * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
//  */


const transforms = {
  greyscale: transformGreyscale,
  invert: doTheInversion
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {


  fs.readFile(file, (err, buffer) => {

//     fs.readFile(`${__dirname}/assets/24bit.bmp`, (err, buffer) => {

//         if (err) {
//             throw err;
//         }


    if (err) {
      throw err;
    }

    bitmap.parse(buffer);

    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });

  });
}

//TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);
console.log('bitmap: ', bitmap.parse());
transformWithCallbacks();
