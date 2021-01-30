import { asset, Environment, NativeModules } from 'react-360';
import VideoModule from 'VideoModule';

const house = require('./config.json')

export const setBackground = (roomName) => {
    //all video players must have a unique name, so this will clear previous video players
    NativeModules.CustomLinkingModule.clearVideoPlayer();

    //determines if the background source is an url or path
    let url_or_path = house.rooms[roomName].background.source.includes('//') ? house.rooms[roomName].background.source : asset(house.rooms[roomName].background.source);
    if(house.rooms[roomName].background.type.toLowerCase() === 'picture'){
      Environment.setBackgroundImage(url_or_path, {
        transition: 1000,
      })
    } else if(house.rooms[roomName].background.type.toLowerCase() === 'video'){ //need to implement video comming from server
        //gives random names to video player
        let videoName = `video-${randomString()}`
        videoBackground = VideoModule.createPlayer(videoName); // Bike.mp4

        this.videoBackground.play({
            source: { url: url_or_path.uri},
            muted: true
        });
    
        // set loop to true to allow video;
        if(house.rooms[roomName].background.loop){
            this.videoBackground.addListener('onVideoStatusChanged', (e) => {
            if (e.status === 'finished') {
                // console.log('Event', e);
                this.videoBackground.resume()
            }
            });
        }
  
      Environment.setBackgroundVideo(videoName, { rotateTransform: [{rotateY: '180deg'}], transition: 1000 });
    } else {
      //errors error
    }
}


const randomString = () => {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_-";
    var string_length = 6;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring
  }