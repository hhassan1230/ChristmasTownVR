import React from 'react';
import {
  asset,
  Image,
  NativeModules,
  View,
  StyleSheet,
  VrButton
} from 'react-360';
// import { changeRoom, openModal, getCurrentRoom } from '../store';
const { AudioModule } = NativeModules;
const house = require('../config.json')

export default class AudioPanel extends React.Component {
    state = {
        playing: house["settings"].audio.soundOnEnter
    }
    componentDidMount(){
      if(this.state.playing){
        this.playAmbientMusic();
      }
    }

    playAmbientMusic() {
      // var 
      AudioModule.playEnvironmental({
        source: asset(house["settings"].audio.SoundURL),
        volume: 0.1,
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
      let icon_sound_On = house.settings.audio.icon_sound_On.includes('//') ? {uri: house.settings.audio.icon_sound_On } : asset(house.settings.audio.icon_sound_On);
      let icon_sound_Off = house.settings.audio.icon_sound_Off.includes('//') ? {uri: house.settings.audio.icon_sound_Off } : asset(house.settings.audio.icon_sound_Off);

      // console.log("URLLL", icon_sound_On)
      return(
        <View style={styles.audioPanel}>
          <VrButton onClick={() => this.state.playing ?  this.stopAmbientMusic() : this.playAmbientMusic()}>
            <Image style={{height: 60, width: 60, marginLeft: 20, marginRight: 20}} source={this.state.playing ? icon_sound_On : icon_sound_Off} />
          </VrButton>
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