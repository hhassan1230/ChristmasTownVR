
import React from 'react';
import { asset, Environment } from 'react-360';
import house from './data/tourData';
import copy from './data/copy';


const State = {
  room: house.Entry.roomName,
  infoActive: false,
  infoImage: copy[0].img,
  info: copy[0].info,
  adjacentRooms: house.Entry.adjacentRooms
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

  Environment.setBackgroundImage(asset(`/PANO_ART/${house[`${roomName}`].img}`));

  updateComponents();
}

export function openModal(id) {
	console.log('We in that changeModal with ' + id);
	// infoImage
	// Find ID

	// Add Images & Text Based off ID

  // const cameraQuat = r360.getCameraQuaternion();
  // infoPanel.recenter(cameraQuat, 'all');

  // Display True
  State.infoActive = true;
}

export function closeModal() {
	console.log('Closing that modal');
	// Display False
	State.infoActive = false;

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