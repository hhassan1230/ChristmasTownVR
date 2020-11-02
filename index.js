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
// import { connect } from 'react-redux';

// import { changeRoom, openModal, closeModal, getCurrentRoom, getCurrentModalState } from './reducer';

const { AudioModule } = NativeModules;

const icon = {
  Nav: 'GUI/ARROW.png',
  Print: 'GUI/BOW.png',
  Picture: 'GUI/EYEBALL.png',
};


class AudioPanel extends React.Component {
  playAmbientMusic() {
    AudioModule.playEnvironmental({
      source: asset('/MUSIC/sugarPlumMixed_1_lower.ogg'),
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

class InfoPanel extends React.Component {
  state = {
    active: getCurrentModalState(),
    id: null,
    hover: false
  }
  
  closePanel(){
    this.setState({hover: false});
    // console.log("modal State on closebtn: ", getCurrentModalState())
    closeModal()
    // console.log("modal State on closebtn: ", getCurrentModalState())
  }

  render() {
    console.log(" -------------------------------------------------- InfoPanel active ", this.state.active + " == " + "getCurrentModalState() " + getCurrentModalState());

    return(
      <View>
      {getCurrentModalState() &&

        <View style={styles.infoPanel}>
            <VrButton
              style={styles.closeBtnContainer}
              onEnter={() => this.setState({hover: true})}
              onExit={() => this.setState({hover: false})}
              onClick={() => this.closePanel() }>
                < Image source={asset('GUI/NaviIcon_24.png')} 
                  style={this.state.hover ?  styles.closeBtnHover : styles.closeBtn}
                />
            </VrButton>
          { <Image source={asset(this.props.infoImage)} style={{height: '70%', width: '100%'}} /> }
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', height: '20%', width: '100%'}}>{ this.props.info }</Text>
        </View>
      }
      </View>
    )
  }
}

class Button extends React.Component {
  state = {
      hover: false,
      active: true,
      id: null,
      roomNow: null,
  }

  clickHandler(roomSelection) {
      if (this.props.type === 'Nav') {
          changeRoom(roomSelection.room);
      } else if (this.props.type === 'Print' || this.props.type === 'Picture') {
          // console.log('-------------------------------- In clickHandler ' + JSON.stingify(this));
          console.log("modal State onclickHandler: ", getCurrentModalState() )
          // Print & Picture
          // Show Info Panel 
          // if (!this.state.roomNow || this.state.roomNow !== roomSelection.id) {
              // this.setState({
              //     roomNow: roomSelection.id
              // });
              // console.log("--------------------------------> ", this.props.type, " <--------------------------------");
              openModal(roomSelection.id, this.props.type);
              NativeModules.CustomLinkingModule.recenterModal()
              console.log("modal State: ", getCurrentModalState())
          // }
          // if (this.state.roomNow === roomSelection.id && getCurrentModalState()) {
          //   console.log("closing modal")
          //     closeModal();
          //     this.setState({ roomNow: null });
          //     console.log("modal State: ", getCurrentModalState())
          // }

          // this.props.recenter();
      } else {
          // Sounds Maybe???

      }

  }

  render() {
    const buttonIcon = icon[this.props.type];

    // console.log("PROPSSS", this.props)
    return(
      <View>
        {this.state.active &&
          <VrButton
            style={this.state.hover ? styles.arrowButtonContainerHover : styles.arrowButtonContainer}
            onEnter={() => this.setState({hover: true})}
            onExit={() => this.setState({hover: false})}
            onClick={() => this.clickHandler({ room: this.props.room, id: this.props.id })}>
              <Image source={asset(buttonIcon)} style={styles.arrowbutton} />
          </VrButton>
        }
      </View>
    )
  }
}

export default class ButtonPanel extends React.Component {

  render() {
    // console.log(" 000000000000000 Button ", this.props);
    
    return (
      <View>
        {this.props.buttonInteraction.originalRoom === getCurrentRoom() &&
          <View style={styles.buttonPanel}>
            { <Button type={this.props.buttonInteraction.type} key={`${this.props.buttonInteraction.roomName}` + '-button'} id={ this.props.buttonInteraction.id } room={ this.props.buttonInteraction.roomName }/> }
            {/* <AudioPanel /> */}
          </View>
        }
      </View>
    );
  }
};



// const mapStateToProps = state => {
//   let storedRepositories = state.repos.map(repo => ({ key: repo.id, ...repo }));
//   return {
//     repos: storedRepositories
//   };
// };

// const mapDispatchToProps = {
//   listRepos
// };
// export default connect(mapStateToProps, mapDispatchToProps)(RepoList);


const ConnectedButtonPanel = connect(ButtonPanel);
const ConnectedInfoPanel = connect(InfoPanel);

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
  closeBtnContainer: {
    marginLeft: 'auto',
    height: '10%',
    width: '10%',
    borderRightColor: 'black',
    right: 0,
  },
  closeBtn:{
    width: 100,
    height: 100,
  },
  closeBtnHover:{
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  infoPanel: {
    display: 'flex',
    width: 800,
    height: 950,
    opacity: 1,
    backgroundColor: 'rgb(255, 200, 50)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
    borderRadius: 20
  },
  buttonPanel: {
    width: 250,
    height: 250,
    opacity: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  // button: {
  //   width: 200,
  //   backgroundColor: 'rgb(0, 0, 0)',
  //   borderColor: 'rgb(255, 255, 255)',
  //   borderWidth: 5,
  // },
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

AppRegistry.registerComponent('ConnectedButtonPanel', () => ConnectedButtonPanel);
AppRegistry.registerComponent('ConnectedInfoPanel', () => ConnectedInfoPanel);