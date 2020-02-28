export default house = {
  Entry: {
    roomName: 'Outside',
    info: ``,
    img: 'ovenland1.JPG',
    adjacentRooms: ['MainHall'],
  },
  MainHall: {
    roomName: 'Main Hall' ,
    info: ``,
    img: 'ovenland2.JPG',
    adjacentRooms: ['Kitchen', 'Sleeping_Room', 'Mushroom_Room', 'Entry']
  },
  Kitchen: {
    roomName: 'Kitchen',
    info: ``,
    img: 'ovenland4.JPG',
    adjacentRooms: ['MainHall']
  },
  Sleeping_Room: {
    roomName: 'Sleeping Room',
    info:``,
    img: 'ovenland3.JPG',
    adjacentRooms: ['MainHall']
  },
  Mushroom_Room: {
    roomName: 'Mushroom Room',
    info: ``,
    img: 'ovenland5.JPG',
    adjacentRooms: ['Breakfast_Nook','MainHall']
  },
  Breakfast_Nook: {
    roomName: 'Feast Hall',
    info: ``,
    img: 'ovenland6.JPG',
    adjacentRooms: ['Mushroom_Room']
  }
}
