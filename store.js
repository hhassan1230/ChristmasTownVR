
import React from 'react';
import { asset, Environment } from 'react-360';
import house from './data/tourData';
import VideoModule from 'VideoModule';
const ROOMS = require('./config.json')

// import copy from './data/copy';
// import printables from './data/printables';

const State = {
  room: house.Entry.roomName,
  infoActive: false,
  infoImage: '',
  info: '',
  adjacentRooms: house.Entry.adjacentRooms,
}

const listeners = new Set();

function updateComponents() {
	
  for (const cb of listeners.values()) {
    cb();
  }
}

export function changeRoom(roomSelection) {
  let roomName = roomSelection;

  State.room = roomName;
  State.adjacentRooms = house[`${roomName}`].adjacentRooms;
  let url_or_path = ROOMS[roomName].backgroundUrl.includes('//') ? ROOMS[roomName].backgroundUrl : asset(ROOMS[roomName].backgroundUrl);
  if(ROOMS[roomSelection].backgroundType === 'Picture'){
    Environment.setBackgroundImage(url_or_path, {
      transition: 1000,
    })
  } else if(ROOMS[roomSelection].backgroundType === 'Video'){
    videoPlayer = VideoModule.createPlayer('videoPlayer'); // Bike.mp4
    this.videoPlayer.play({
      source: { url: asset(ROOMS[roomName].backgroundUrl).uri},
      muted: true
    });

    // this.bikingVideo.setLoop(true);
    if(ROOMS[roomName].loop){
      this.videoPlayer.addListener('onVideoStatusChanged', (e) => {
        if (e.status === 'finished') {
            // console.log('Event', e);
            this.videoPlayer.resume()
        }
      });
    }

    Environment.setBackgroundVideo('videoPlayer', { rotateTransform: [{rotateY: '180deg'}] });
  } else {
    //background type error
  }

  // Environment.setBackgroundImage(asset(`/PANO_ART/${house[`${roomName}`].img}`));

  State.infoActive = false;

  updateComponents();
}


export function openModal(room, interactionId) {
	// console.log('We in that changeModal with ' + id + " & This == " + this);
	// infoImage
	let matchingInfo = ROOMS[room].interactions.filter(interaction => interaction.id === interactionId)[0];
  State.infoImage = matchingInfo.url_or_path;
  State.info = matchingInfo.info; 
  State.infoActive = true;
  updateComponents();
  // React360.recenterInfoPanel();
  // _listener();
}

export function closeModal() {
	console.log('Closing that modal');
	// Display False
	State.infoActive = false;
	updateComponents();
	// _listener();
}

export function getCurrentRoom() {
	return State.room;
}

export function getCurrentModalState() {
	return State.infoActive;
}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      room: State.room,
      infoActive: State.infoActive,
      info: State.info,
		  infoImage: State.infoImage,
      adjacentRooms: State.adjacentRooms
    };

    _listener = () => {
      this.setState({
        room: State.room,
        infoActive: State.infoActive,
        info: State.info,
        infoImage: State.infoImage,
        adjacentRooms: State.adjacentRooms
      });
    }

    componentDidMount() {
      listeners.add(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          room={this.state.room}
          infoActive={this.state.infoActive}
          info={this.state.info}
          infoImage={this.state.infoImage}
          adjacentRooms={this.state.adjacentRooms}
        />
      )
    }
  }
}