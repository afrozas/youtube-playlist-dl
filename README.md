# YouTube Playlist Downloader

>**This NodeJs script downloads all the videos from a YouTube playlist.**

### Tech

The script makes use of [youtube-dl](https://rg3.github.io/youtube-dl/) .


### Installation

>This installation guide is aimed at `Debian and Ubuntu based Linux distributions`.

`curl` is required for the installation. To check if `curl` is installed locally, run :
```sh
$ curl -V
```
This gives the version of `curl` installed.

If `curl` is not installed, run : 
```sh
$ sudo apt-get install curl
```

[**`Node.js`**](https://nodejs.org/) v3+ is required to run this script.

To install the latest release [ Node.js v7](https://nodejs.org/en/download/package-manager/):

```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

Download the [zip](https://github.com/enigmaeth/youtube-playlist-dl/archive/master.zip) and extract it into a directory. Change your path into the extracted folder: 
```sh
$ cd path/to/youtube-playlist-dl
```
Now, install the dependency packages from `package.json`  : 
```sh
$ npm install 
```
**npm** will download all the required packages.

### Running YouTube Playlist Downloader

To download a playlist , copy the `url` of the playlist and run: 
```sh
$ node playlist.js url path/to/Downloads_directory
```
where `path/to/Downloads_directory` is the complete path to the directory where the videos are to be downloaded.

If the download is interrupted, rerun the same command : 
```sh
$ node playlist.js url path/to/Downloads_directory
```
This will resume the download .
 
