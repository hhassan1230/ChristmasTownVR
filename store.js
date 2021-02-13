
import React from 'react';
import {setBackground} from './helper.js'
const house = require('./config.json')

// import copy from './data/copy';
// import printables from './data/printables';

const State = {
  room: house.rooms.Entry.roomName,
  infoActive: false,
  infoType: '',
  infoSource: '',
  infoDisplayType: '',
  info: '',
  adjacentRooms: house.rooms.Entry.adjacentRooms,
}

const listeners = new Set();

function updateComponents() {
	
  for (const cb of listeners.values()) {
    cb();
  }
}

export function changeRoom(roomSelection) {
  State.room = roomSelection;
  State.adjacentRooms = house.rooms[`${roomSelection}`].adjacentRooms;
  // calls helper to set/change background
  setBackground(roomSelection)
  State.infoActive = false;
  updateComponents();
}


export function openModal(room, interactionId) {
	// infoSource
  let matchingInfo = house.rooms[room].interactions.filter(interaction => interaction.id === interactionId)[0];
  State.infoType = matchingInfo.type;
  State.infoSource = matchingInfo.display.source;
  State.infoDisplayType = matchingInfo.display.type;
  State.info = matchingInfo.display.text; 
  State.infoActive = true;

  updateComponents();
  // React360.recenterInfoPanel();
  // _listener();
}

export function closeModal() {
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
      infoType: State.infoType,
      infoSource: State.infoSource,
      infoDisplayType: State.infoDisplayType,
      adjacentRooms: State.adjacentRooms
    };

    _listener = () => {
      this.setState({
        room: State.room,
        infoActive: State.infoActive,
        info: State.info,
        infoType: State.infoType,
        infoSource: State.infoSource,
        infoDisplayType: State.infoDisplayType,
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
          infoType={this.state.infoType}
          infoSource={this.state.infoSource}
          infoDisplayType={this.state.infoDisplayType}
          adjacentRooms={this.state.adjacentRooms}
        />
      )
    }
  }
}