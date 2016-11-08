var path = require('path');
var fs = require('fs');
var ytdl = require('youtube-dl');

function playlist(url) {

    'use strict';
    var downloaded = 0;

    // arguments passed to youtube-dl
    var video = ytdl(url, ['--format=18'], {
        start: downloaded,
        cwd: pathToFolder
    });
    
    // log errors, if anyus
    video.on('error', function error(err) {
        console.log(err.stack);
    });

    var size = 0;
    //called when download starts 
    video.on('info', function(info) {
        downloaded = 0;
        size = info.size;

        //output file name
        var output = path.join(pathToFolder + '/', info._filename + '.mp4');

        console.log("\n" + info._filename);
        if (fs.existsSync(output)) {

            // if video is partially downloaded
            downloaded = fs.statSync(output).size;
            var total = info.size + downloaded;
            if (downloaded <= info.size) {
                console.log('resuming from: ' + (downloaded / total * 100).toFixed(2) + '%');
            } else {
               video.on('next', playlist);
            }
            
            //append to the existing stream
            video.pipe(fs.createWriteStream(output, {
                flags: 'a'
            }));
            
            //called if video has been already downloaded 
            video.on('complete', function complete(info) {
                console.log('filename: ' + info._filename + ' already downloaded.');
            });
            
            //called on completion of download
            video.on('end', function end() {
                console.log('finished downloading!');
            });
            
        } else {

            // starting video download afresh
            console.log('Downloading...');
            
            //create a new stream
            video.pipe(fs.createWriteStream(output));
            var pos = 0;

            //show % completion of download
            video.on('data', function data(chunk) {
                pos += chunk.length;
                if (size) {
                    var percent = (pos / size * 100).toFixed(2);
                    process.stdout.cursorTo(0);
                    process.stdout.clearLine(1);
                    process.stdout.write(percent + '%');
                }
            });
        }
    });

    //fetch the next video in the playlist
    video.on('next', playlist);
}



var url = process.argv[2];                          // url from terminal
var pathToFolder = process.argv[3];                 // download folder path from terminal
console.log("'\n' downloading playlist :: " + url);  

playlist(url);                                      // pass url to function playlist()
