export default house = {
  Entry: {
    roomName: 'Entry',
    info: ``,
    backgroundAudio: ``,
    img: 'ovenland1.JPG',
    adjacentRooms: ['MainHall']
  },
  MainHall: {
    roomName: 'MainHall' ,
    info: ``,
    backgroundAudio: ``,
    img: 'ovenland2.JPG',
    adjacentRooms: ['Kitchen', 'Sleeping_Room', 'Mushroom_Room', 'Entry']
  },
  Kitchen: {
    roomName: 'Kitchen',
    info: ``,
    backgroundAudio: ``,
    img: 'ovenland4.JPG',
    adjacentRooms: ['MainHall']
  },
  Sleeping_Room: {
    roomName: 'Sleeping_Room',
    info:``,
    backgroundAudio: ``,
    img: 'ovenland3.JPG',
    adjacentRooms: ['MainHall']
  },
  Mushroom_Room: {
    roomName: 'Mushroom_Room',
    info: ``,
    backgroundAudio: ``,
    img: 'ovenland5.JPG',
    adjacentRooms: ['Breakfast_Nook','MainHall']
  },
  Breakfast_Nook: {
    roomName: 'Feast_Hall',
    info: ``,
    backgroundAudio: ``,
    img: 'ovenland6.JPG',
    adjacentRooms: ['Mushroom_Room']
  }
};
