import React from 'react';
import { asset, Environment } from 'react-360';
import house from './data/tourData';
import copy from './data/copy';

export default function reducer(state = { 
		room: house.Entry.roomName,
		infoActive: false,
		infoImage: copy[0].img,
		info: copy[0].info,
		adjacentRooms: house.Entry.adjacentRooms
	}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, infoActive: action.payload.infoActive, infoImage: action.payload.infoImage, info: action.payload.info };
    case CLOSE_MODAL:
      return { ...state, infoActive: action.payload.infoActive };
    case CHANGE_ROOM:
      return {
        ...state,
        room: action.payload.room,
        adjacentRooms: action.payload.adjacentRooms,
        infoActive: action.payload.infoActive,
      };
    default:
      return state;
  }
}

export function changeRoom(roomSelection) {
  let roomName = roomSelection;

  let room = roomName;
  let adjacentRooms = house[`${roomName}`].adjacentRooms;

  Environment.setBackgroundImage(asset(`/PANO_ART/${house[`${roomName}`].img}`));

  let infoActive = false;

  return {
    type: CHANGE_ROOM,
    payload: {
      room,
      adjacentRooms,
      infoActive,
    }
  };
  
}

export function openModal(id, type) {
  let matchingInfo;
  if (type === "Picture") {
  	 matchingInfo = copy.filter(function(contact) { return contact.id == id; });
  } else {
  		matchingInfo = printables.filter(function(contact) { return contact.id == id; });
  }

  return {
    type: OPEN_MODAL,
    payload: {
      infoImage: matchingInfo[0].img,
      info: matchingInfo[0].info,
      infoActive: true,
    }
  };
}

export function closeModal() {

  return {
    type: CLOSE_MODAL,
    payload: {
      request: {
        infoActive: false,
      }
    }
  };
}