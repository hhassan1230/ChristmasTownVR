import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-360';

import { connect } from './store';
import ButtonPanel from './components/ButtonPanel'
import InfoPanel from './components/InfoPanel'
import AudioPanel from './components/AudioPanel'
import {setBackground} from './helper.js'

class EntryRoom extends React.Component {
  componentDidMount() { setBackground('Entry') }

  render() {
    return( <View /> )
  }
}


const ConnectedEntryRoom = connect(EntryRoom);
const ConnectedButtonPanel = connect(ButtonPanel);
const ConnectedInfoPanel = connect(InfoPanel);
const ConnectedAudioPanel = connect(AudioPanel);


AppRegistry.registerComponent('ConnectedEntryRoom', () => ConnectedEntryRoom);
AppRegistry.registerComponent('ConnectedButtonPanel', () => ConnectedButtonPanel);
AppRegistry.registerComponent('ConnectedInfoPanel', () => ConnectedInfoPanel);
AppRegistry.registerComponent('ConnectedAudioPanel', () => ConnectedAudioPanel);