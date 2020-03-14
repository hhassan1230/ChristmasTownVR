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
import { connect, changeRoom, getCurrentRoom } from './store';

const { AudioModule } = NativeModules;

class AudioPanel extends React.Component {
  playAmbientMusic() {
    AudioModule.playEnvironmental({
      source: asset('MUSIC/sugarPlumMixed_1_lower.ogg'),
      volume: 0.1,
    });
  }

  stopAmbientMusic() {
    AudioModule.stopEnvironmental();
  }

  render() {
    return(
      <View style={styles.audioPanel}>
        <VrButton onClick={() => this.playAmbientMusic()}>
          <Image style={{height: 50, width: 50}} source={{uri: 'https://hhassan1230.github.io/science-barge-tour/static_assets/audioOn.png'}} />
        </VrButton>
        <VrButton onClick={() => this.stopAmbientMusic()}>
          <Image style={{height: 50, width: 50}} source={{uri: 'https://hhassan1230.github.io/science-barge-tour/static_assets/audioOff.png'}} />
        </VrButton>
      </View>
    )
  }
}

class HouseInfoPanel extends React.Component {
  render() {
    return(
      <View>
        <View style={styles.infoPanel}>
          <Text style={styles.header}>Info</Text>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{ this.props.info }</Text>
        </View>
      </View>
    )
  }
}

class Button extends React.Component {
  state = {
    hover: false,
    active: true,
    id: null,
  }

  clickHandler(roomSelection) {
    changeRoom(roomSelection);
  }

  render() {
    return(
      <View>
        {this.state.active &&
          <VrButton
            style={this.state.hover ? styles.arrowButtonContainerHover : styles.arrowButtonContainer}
            onEnter={() => this.setState({hover: true})}
            onExit={() => this.setState({hover: false})}
            onClick={() => this.clickHandler(this.props.room)}>
            {/*<Text style={{textAlign: 'center'}}>{ this.props.room.split('_').join(' ') }</Text>*/}
            <Image source={asset('GUI/ARROW.png')} style={styles.arrowbutton} />
          </VrButton>
        }
      </View>
    )
  }
}

export default class ButtonInfoPanel extends React.Component {

  render() {
    console.log("getCurrentRoom", getCurrentRoom());
    return (
      <View>
        {this.props.buttonInteraction.originalRoom === getCurrentRoom() &&

          <View style={styles.buttonPanel}>
            { <Button key={`${this.props.buttonInteraction.roomName}` + '-button'} room={ this.props.buttonInteraction.roomName }/> }
            {/* <AudioPanel /> */}
          </View>
        }
      </View>
    );
  }
};

const ConnectedButtonInfoPanel = connect(ButtonInfoPanel);
const ConnectedHouseInfoPanel = connect(HouseInfoPanel);

const styles = StyleSheet.create({
  audioPanel: {
    flexDirection: 'row'
  },
  arrowbutton: {
    width: 200,
    height: 200,
  },
  arrowButtonContainer: {
    width: 200,
  },
  arrowButtonContainerHover: {
    width: 250,
  },
  infoPanel: {
    width: 400,
    height: 400,
    opacity: 0.8,
    backgroundColor: 'rgb(255, 200, 50)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
    borderRadius: 20
  },
  buttonPanel: {
    width: 220,
    height: 220,
    opacity: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    width: 200,
    backgroundColor: 'rgb(0, 0, 0)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
  },
  hover: {
    width: 200,
    backgroundColor: 'rgb(0, 45, 72)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('ConnectedButtonInfoPanel', () => ConnectedButtonInfoPanel);
AppRegistry.registerComponent('ConnectedHouseInfoPanel', () => ConnectedHouseInfoPanel);