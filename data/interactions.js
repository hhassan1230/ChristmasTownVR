export default interactions = [
	{
		roomName: 'MainHall',
		type: `Nav`,
		location: {x: 0.09, y: -0.32, z: 0},
		distance: 1,
		originalRoom: `Entry`,
    img: 'ovenland2.JPG',
    id: 1
  },
	{
	  roomName: 'Kitchen',
	  type: `Nav`,
		location: {x: 700.05, y: 0.095, z: -0.05},
		distance: 1,
	  originalRoom: `MainHall`,
	  img: 'ovenland4.JPG',
	  id: 2
	},
	{
	  roomName: 'Sleeping_Room',
	  type: `Nav`,
	  location: {x: 0.5, y: 0.075, z: 0.12}, // Don't Fuck with this
	  distance: 1,
	  originalRoom:`MainHall`,
	  img: 'ovenland3.JPG',
	  id: 2
	},
	{
    roomName: 'Mushroom_Room',
    type: `Nav`,
    location: {x: 1.55, y: 0.039, z: null},
    distance: 1,
    originalRoom: `MainHall`,
    img: 'ovenland5.JPG',
    id: 2
  },
  {
    roomName: 'Entry',
    type: `Nav`,
    location: {x: -1.53, y: 0.045, z: 0.12}, //Need to do the negative Gangsta Lean
    distance: 1,
    originalRoom: `MainHall`,
    img: 'ovenland1.JPG',
    id: 2
  },
  {
	  roomName: 'MainHall' ,
	  type: `Nav`,
	  location: {x: 3.13, y: -0.014, z: null},
	  distance: 1,
	  originalRoom: `Sleeping_Room`,
	  img: 'ovenland2.JPG',
	  id: 3
	},
  {
	  roomName: 'MainHall' ,
	  type: `Nav`,
	  location: {x: 3.15, y: 0.03, z: null},
	  distance: 1,
	  originalRoom: `Kitchen`,
	  img: 'ovenland2.JPG',
	  id: 4
	},
	{
    roomName: 'Breakfast_Nook',
    type: `Nav`,
    location: {x: 0.15, y: 0.91, z: -0.17},
    distance: 1,
    originalRoom: `Mushroom_Room`,
    img: 'ovenland6.JPG',
    id: 5
  },
	{
		roomName: 'MainHall',
		type: `Nav`,
		location: {x: 3.05, y: 0.3, z: null},
		distance: 1,
		originalRoom: `Mushroom_Room`,
    img: 'ovenland2.JPG',
    id: 5
  },
  {
    roomName: 'Mushroom_Room',
    type: `Nav`,
    location: {x: -1.68, y: 0.4, z: null}, //End of Navagation 
    distance: 1,
    originalRoom: `Breakfast_Nook`,
    img: 'ovenland5.JPG',
    id: 6
  },
  {
    roomName: 'Entry',
    type: `Picture`,
    location: {x: -1.68, y: 0.4, z: null},
    distance: 1,
    originalRoom: `Entry`,
    Picture: null,
    img: 'ovenland1.JPG',
    id: 1
  },
  {
    roomName: 'Entry',
    type: `Picture`,
    location: {x: 1.60, y: 0.71, z: null},
    distance: 1,
    originalRoom: `Entry`,
    Picture: null,
    img: 'ovenland1.JPG',
    id: 2
  },
  {
    roomName: 'Entry',
    type: `Picture`,
    location: {x: 1.60, y: 0.71, z: null},
    distance: 1,
    originalRoom: `Entry`,
    Picture: null,
    img: 'ovenland1.JPG',
    id: 1
  },
  {
    roomName: 'MainHall',
    type: `Picture`,
    location: {x: -0.48, y: 0.80, z: null},
    distance: 0.07,
    originalRoom: `MainHall`,
    Picture: null,
    img: 'ovenland2.JPG',
    id: 3
  },
  {
    roomName: 'Kitchen',
    type: `Picture`,
    location: {x: -1.78, y: 0.70, z: null},
    distance: 0.07,
    originalRoom: `Kitchen`,
    Picture: null,
    img: 'ovenland4.JPG',
    id: 5
  },
  {
    roomName: 'Sleeping_Room',
    type: `Picture`,
    location: {x: 0.62, y: 0.087, z: 0.05},
    distance: 0.07,
    originalRoom: `Sleeping_Room`,
    Picture: null,
    img: 'ovenland6.JPG',
    id: 4
  },
  {
    roomName: 'Mushroom_Room',
    type: `Picture`,
    location: {x: 0.0, y: -4.13, z: null},
    distance: 0.07,
    originalRoom: `Mushroom_Room`,
    Picture: null,
    img: 'ovenland5.JPG',
    id: 6
  },
  {
    roomName: 'Breakfast_Nook',
    type: `Picture`,
    location: {x: 3.765, y: 0.13, z: null},
    distance: 0.07,
    originalRoom: `Breakfast_Nook`,
    Picture: null,
    img: 'ovenland6.JPG',
    id: 7
  },
  {
    roomName: 'Breakfast_Nook',
    type: `Picture`,
    location: {x: -4.965, y: 0.749, z: null},
    distance: 0.07,
    originalRoom: `Breakfast_Nook`,
    Picture: null,
    img: 'ovenland6.JPG',
    id: 8
  },
  {
    roomName: 'Breakfast_Nook',
    type: `Picture`,
    location: {x: -5.48, y: 1.049, z: -0.78},
    distance: 0.07,
    originalRoom: `Breakfast_Nook`,
    Picture: null,
    img: 'ovenland6.JPG',
    id: 9
  },
  {
    roomName: 'Entry',
    type: `Print`,
    location: {x: 0.087, y: 0.64, z: null},
    distance: 1,
    originalRoom: `Entry`,
    Picture: null,
    img: 'ovenland2.JPG',
    id: 101
  },
  {
    roomName: 'MainHall',
    type: `Print`,
		location: {x: 1.51, y: 0.465, z: null},
    distance: 1,
    originalRoom: `MainHall`,
    Picture: null,
    img: 'ovenland2.JPG',
    id: 102
  },
  {
    roomName: 'Kitchen',
    type: `Print`,
		location: {x: -0.11, y: 0.665, z: null},
    distance: 1,
    originalRoom: `Kitchen`,
    Picture: null,
    img: 'ovenland4.JPG',
    id: 103
  },
  {
    roomName: 'Sleeping_Room',
    type: `Print`,
		location: {x: 1.49, y: 0.61, z: 0.05},
    distance: 1,
    originalRoom: `Sleeping_Room`,
    Picture: null,
    img: 'ovenland3.JPG',
    id: 104
  },
  {
    roomName: 'Mushroom_Room',
    type: `Print`,
		location: {x: -1.391, y: 1.06, z: 0.31},
    distance: 1,
    originalRoom: `Mushroom_Room`,
    Picture: null,
    img: 'ovenland5.JPG',
    id: 105
  },
  {
    roomName: 'Breakfast_Nook',
    type: `Print`,
		location: {x: 2.975, y: 1.11, z: 0.03},
    distance: 1,
    originalRoom: `Breakfast_Nook`,
    Picture: null,
    img: 'ovenland6.JPG',
    id: 106
  }
];