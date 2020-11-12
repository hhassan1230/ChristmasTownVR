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


// import { connect } from 'react-redux';

// import { changeRoom, openModal, closeModal, getCurrentRoom, getCurrentModalState } from './reducer';

// const { AudioModule } = NativeModules;



// class AudioPanel extends React.Component {
//   playAmbientMusic() {
//     AudioModule.playEnvironmental({
//       source: asset('/MUSIC/sugarPlumMixed_1_lower.ogg'),
//       volume: 0.1,
//     });
//   }

//   stopAmbientMusic() {
//     AudioModule.stopEnvironmental();
//   }

//   render() {
//     return(
//       <View style={styles.audioPanel}>
//         <VrButton onClick={() => this.playAmbientMusic()}>
//           <Image style={{height: 50, width: 50}} source={{uri: 'https://hhassan1230.github.io/science-barge-tour/static_assets/audioOn.png'}} />
//         </VrButton>
//         <VrButton onClick={() => this.stopAmbientMusic()}>
//           <Image style={{height: 50, width: 50}} source={{uri: 'https://hhassan1230.github.io/science-barge-tour/static_assets/audioOff.png'}} />
//         </VrButton>
//       </View>
//     )
//   }
// }



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