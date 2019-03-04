![cf](http://i.imgur.com/7v5ASc8.png) Lab Submission Instructions
============================================================================
# 401n12-bitmap-project
LAB: Buffers - Bitmap Transformer

## Project Name
LAB: Buffers - Bitmap Transformer
https://travis-ci.com/

### Group Authors: Sarkis Aghazarian, Alistair Blake, Andrew Davis, Jerome Joof
### Links and Resources
repo https://github.com/jjblues86/401N12-bitmap-project
https://travis-ci.com/
back-end
front-end https://bitmap-project-401n12.herokuapp.com/
## Canvas Submission
* Link to the README.md in your lab repo
* Upload your README.md and any supportive images to this folder.
* Submit a link to your `/docs/README.md` for your canvas submission
  
## Operation
For this assignment you will be building a bitmap (.bmp) transformer CLI. It will read a bitmap in from disk, run one or more color or raster transforms and then write it out to a new file. This project will require the use of node buffers in order to manipulate binary data. Your solution should be composed of small tested modules that solve specific problems. Your modules should be thoughtfully named and well documented. The entry point to your CLI should be an index.js file in the root of your package, and all helper modules should be placed in your lib/ directory. Your bitmap transformer modules should not use any third party libraries.
    
## Assignment 1: Code that writes code …
 * Do this with callbacks
 
## Assignment 2: Modularize the code 
  * What should be unique, testable modules?
  * What structure should you use to most easily export?
  * How best can we make this scale?

## Deployment - Server Based Labs
 * Your server must be deployed at Heroku
 * If it requires a database, provision it
 * For APIs, your endpoints should all be testable remotely using httpie or postman
 * For Web Servers, your website must be reachable
 
## Deployment - React Labs
 * Your app must be deployed at AWS Cloudfront
 * Use an automated deployment, connecting your repository to AWS through cloud formation
 
## Testing
* Use BDD describe and test methods to define descriptive tests and increase readability.
* Each test callback should aim to test a small well-defined feature of a function.
* Write tests to ensure each function behaves correctly with valid and invalid inputs.
* The CLI should be tested without using child process or any equivalent third party libraries.
 
## Documentation
#### Strategy
Parse the buffer to find the color table.
Alter the color table in individual methods and create a new bitmap with the transformed color table. 
