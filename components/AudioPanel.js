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
const house = require('../config.json')

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
      let url_or_pathOn = house.settings.audio.url_or_pathOn.includes('//') ? house.settings.audio.url_or_pathOn : asset(house.settings.audio.url_or_pathOn);
      let url_or_pathOff = house.settings.audio.url_or_pathOff.includes('//') ? house.settings.audio.url_or_pathOff : asset(house.settings.audio.url_or_pathOff);

      console.log("URLLL", url_or_pathOn)
      return(
        <View style={styles.audioPanel}>
          <VrButton onClick={() => this.state.playing ?  this.stopAmbientMusic() : this.playAmbientMusic()}>
            <Image style={{height: 60, width: 60, marginLeft: 20, marginRight: 20}} source={{uri: this.state.playing ? url_or_pathOn : url_or_pathOff}} />
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
      borderWidth: 1,
      borderColor: 'rgb(0, 0, 0)',
      backgroundColor: 'rgb(224, 253, 234)',
      borderRadius: 50,
      width: 80,
      height: 70,
      alignContent: 'center'
    }
  });