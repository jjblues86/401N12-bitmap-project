'use strict';

const fs = require('fs');


// Need to create a bitmap object divided into arrays: header, width, height, color planes, pixels per bit, color pixels66

console.log('step 1')

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */


function Bitmap(filePath) {
    this.file = filePath;
};

console.log('step 2')

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */

Bitmap.prototype.parse = function(buffer) {
    this.buffer = buffer;
    console.log(this.buffer.length)
    this.type = buffer.toString('utf-8', 0, 2);
    this.size = buffer.readUInt32LE(2);
    this.pixelsStart = buffer.readUInt32LE(10);
    this.dibHeaderSize  = buffer.readUInt32LE(14);
    this.width = buffer.readUInt32LE(18);
    this.height = buffer.readUInt32LE(22);
    this.bitDepth = buffer.readUInt16LE(28);
    this.compressMethod = buffer.readUInt32LE(30);
    this.numberOfColors = buffer.readUInt32LE(46);
    this.pixels = buffer.slice(1078, buffer.length);
    this.colorPalette = buffer.slice(54, buffer.length); //This is the buffer that will change color output
    return this;
    //... and so on
};

console.log('step 3')

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */

Bitmap.prototype.transform = function(operation) {
    // This is really assumptive and unsafe
    transforms[operation](this.colorPalette); //Fixed it
    this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

console.log('step 4')

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */

const transforms = {

transformGreyscale: (bmp) => {

    // console.log('Transforming bitmap into greyscale', bmp);

    //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

    //TODO: alter bmp to make the image greyscale ...
    let average = 0;
    for(let i = 0; i < bmp.length; i++) {
            average += bmp[i];
        if(i % 3 == 0 && bmp[i] != 0) {
            average = Math.round(average / 3);
            bmp[i] = average;
            bmp[i - 1] = average;
            bmp[i - 2] = average;
            }
        }
    },


    doTheInversion: (bmp) => {
        bmp = {};
        for(let i = 54; i <  bmp.length; i++) {
            bmp[i] = 255 -  bmp[i];
        }
    },

};

console.log('step 5')

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */

// const transforms = {
//     greyscale: transformGreyscale,
//     invert: doTheInversion
// }; //don't need this anymore since "tarnsforms" is declared above

console.log('step 6')

// ------------------ GET TO WORK ------------------- //

    function transformWithCallbacks() {

        fs.readFile(file, (err, buffer) => {

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

// TODO: Explain how this works (in your README)
    const [file, operation] = process.argv.slice(2);

    let bitmap = new Bitmap(file);

    transformWithCallbacks();
