import React from 'react';
import {
  asset,
  Image,
  NativeModules,
  View,
  StyleSheet,
  VrButton
} from 'react-360';
import { changeRoom, openModal, getCurrentRoom } from '../store';
const { AudioModule } = NativeModules;

export default class AudioPanel extends React.Component {
    state = {
        playing: true
    }
    componentDidMount(){
        this.playAmbientMusic();
    }

    playAmbientMusic() {
      AudioModule.playEnvironmental({
        source: asset('/MUSIC/sugarPlumMixed_1_lower.ogg'),
        volume: 50,
      });
      if(!this.state.playing){
          this.setState({playing: true})
      }
    }
  
    stopAmbientMusic() {
      AudioModule.stopEnvironmental();
      this.setState({playing: false})
    }
  
    render() {
      return(
        <View style={styles.audioPanel}>
          <VrButton onClick={() => this.state.playing ?  this.stopAmbientMusic() : this.playAmbientMusic()}>
            <Image style={{height: 60, width: 60, marginLeft: 20, marginRight: 20}} source={asset( this.state.playing ? './audioOn.png' : './audioOff.png')} />
          </VrButton>
          {/* <VrButton onClick={() => this.stopAmbientMusic()}>
            <Image style={{height: 50, width: 50}} source={{uri: 'https://hhassan1230.github.io/science-barge-tour/static_assets/audioOff.png'}} />
          </VrButton> */}
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    audioPanel: {
      flexDirection: 'row',
      // borderWidth: 2,
      // borderColor: 'black',
      width: 80,
      height: 80,
      // opacity: .5,
      alignContent: 'center'
    }
  });