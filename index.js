import React from 'react';
import {
  asset,
  Image,
  NativeModules,
  AppRegistry,
  Environment,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';
import VideoModule from 'VideoModule';

import { connect, changeRoom, openModal, closeModal, getCurrentRoom, getCurrentModalState } from './store';
import ButtonPanel from './components/ButtonPanel'
import InfoPanel from './components/InfoPanel'
import AudioPanel from './components/AudioPanel'
import {setBackground} from './helper.js'

class EntryRoom extends React.Component {

  componentDidMount() {
    setBackground('Entry')
  }

  componentWillUnmount() {
    console.log('should destroy video')
    // this.videoPlayer.destroyPlayer();
  }

  render() {

    return(
      <View>
        {/* <View>
          {selection}
        </View>
        <View style={styles.section}>
          {sceneButtons}
        </View> */}
      </View>
    )
  }
}


const ConnectedEntryRoom = connect(EntryRoom);
const ConnectedButtonPanel = connect(ButtonPanel);
const ConnectedInfoPanel = connect(InfoPanel);
const ConnectedAudioPanel = connect(AudioPanel);

// const styles = StyleSheet.create({
//   audioPanel: {
//     flexDirection: 'row'
//   },
// });

AppRegistry.registerComponent('ConnectedEntryRoom', () => ConnectedEntryRoom);
AppRegistry.registerComponent('ConnectedButtonPanel', () => ConnectedButtonPanel);
AppRegistry.registerComponent('ConnectedInfoPanel', () => ConnectedInfoPanel);
AppRegistry.registerComponent('ConnectedAudioPanel', () => ConnectedAudioPanel);