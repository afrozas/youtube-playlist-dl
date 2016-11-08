var path = require('path');
var fs = require('fs');
var ytdl = require('youtube-dl');

function playlist(url) {

    'use strict';
    var downloaded = 0;
    var video = ytdl(url, ['--format=18'], {
        start: downloaded,
        cwd: pathToFolder
    });
    video.on('error', function error(err) {
        console.log(err.stack);
    });
    var size = 0;
    video.on('info', function(info) {
        downloaded = 0;
        size = info.size;
        var output = path.join(pathToFolder + '/', info._filename + '.mp4');
        console.log("\n" + info._filename);
        if (fs.existsSync(output)) {
            downloaded = fs.statSync(output).size;
            var total = info.size + downloaded;
            if (downloaded <= info.size) {
                console.log('resuming from: ' + (downloaded / total * 100).toFixed(2) + '%');
            } else {
               video.on('next', playlist);
            }
            video.pipe(fs.createWriteStream(output, {
                flags: 'a'
            }));
            video.on('complete', function complete(info) {
                console.log('filename: ' + info._filename + ' already downloaded.');
            });
            video.on('end', function end() {
                console.log('finished downloading!');
            });
        } else {
            console.log('Downloading...');
            video.pipe(fs.createWriteStream(output));
            var pos = 0;
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
    video.on('next', playlist);
}



var url = process.argv[2];
var pathToFolder = process.argv[3];
console.log("downloading playlist :: " + url);
playlist(url);
