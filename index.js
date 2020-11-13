import React from 'react';
import {
  asset,
  Image,
  NativeModules,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';
import { connect, changeRoom, openModal, closeModal, getCurrentRoom, getCurrentModalState } from './store';
import ButtonPanel from './components/ButtonPanel'
import InfoPanel from './components/InfoPanel'
import AudioPanel from './components/AudioPanel'


// export default class Room extends React.Component {
//   componentDidMount() {
//     // Environment.setBackgroundImage(asset('trainStation2.jpg'), { rotateTransform: [{rotateY: '180deg'}] });
//   }
//   clickHandler(roomSelection) {

//   }

//   render() {
//     return (
//       <View>
//         <View>
//           {/* map interactions */}
//         </View> 
//           {/* // audiopanel btn */}
//       </View>
//     );
//   }
// };



const ConnectedButtonPanel = connect(ButtonPanel);
const ConnectedInfoPanel = connect(InfoPanel);
const ConnectedAudioPanel = connect(AudioPanel);

// const styles = StyleSheet.create({
//   audioPanel: {
//     flexDirection: 'row'
//   },
// });

AppRegistry.registerComponent('ConnectedButtonPanel', () => ConnectedButtonPanel);
AppRegistry.registerComponent('ConnectedInfoPanel', () => ConnectedInfoPanel);
AppRegistry.registerComponent('ConnectedAudioPanel', () => ConnectedAudioPanel);