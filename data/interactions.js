export default interactions = [
	{
		roomName: 'MainHall',
		type: `Nav`,
		location: {x: 0.09, y: -0.32},
		originalRoom: `Entry`,
    img: 'ovenland2.JPG',
    id: 1
  },
	{
	  roomName: 'Kitchen',
	  type: `Nav`,
		location: {x: 700.05, y: 0.095},
	  originalRoom: `MainHall`,
	  img: 'ovenland4.JPG',
	  id: 2
	},
	{
	  roomName: 'Sleeping_Room',
	  type: `Nav`,
	  location: {x: 0.5, y: 0.075}, // Don't Fuck with this
	  originalRoom:`MainHall`,
	  img: 'ovenland3.JPG',
	  id: 2
	},
	{
    roomName: 'Mushroom_Room',
    type: `Nav`,
    location: {x: 1.55, y: 0.039},
    originalRoom: `MainHall`,
    img: 'ovenland5.JPG',
    id: 2
  },
  {
    roomName: 'Entry',
    type: `Nav`,
    location: {x: -1.53, y: 0.06}, //Need to do the negative Gangsta Lean
    originalRoom: `MainHall`,
    img: 'ovenland1.JPG',
    id: 2
  },
  {
	  roomName: 'MainHall' ,
	  type: `Nav`,
	  location: {x: 3.13, y: -0.014},
	  originalRoom: `Sleeping_Room`,
	  img: 'ovenland2.JPG',
	  id: 3
	},
  {
	  roomName: 'MainHall' ,
	  type: `Nav`,
	  location: {x: 3.15, y: 0.03},
	  originalRoom: `Kitchen`,
	  img: 'ovenland2.JPG',
	  id: 4
	},
	{
    roomName: 'Breakfast_Nook',
    type: `Nav`,
    location: {x: 0.15, y: 0.94},
    originalRoom: `Mushroom_Room`,
    img: 'ovenland6.JPG',
    id: 5
  },
	{
		roomName: 'MainHall',
		type: `Nav`,
		location: {x: 3.05, y: 0.3},
		originalRoom: `Mushroom_Room`,
    img: 'ovenland2.JPG',
    id: 5
  },
  {
    roomName: 'Mushroom_Room',
    type: `Nav`,
    location: {x: 0.0, y: 0.0},
    originalRoom: `Breakfast_Nook`,
    img: 'ovenland5.JPG',
    adjacentRooms: 6
  }
];