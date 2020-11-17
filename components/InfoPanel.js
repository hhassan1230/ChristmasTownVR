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
import { connect, changeRoom, openModal, closeModal, getCurrentRoom, getCurrentModalState } from '../store';

export default class InfoPanel extends React.Component {
    state = {
      active: getCurrentModalState(),
      id: null,
      hover: false
    }
    
    closePanel(){
      this.setState({hover: false});
      // console.log("modal State on closebtn: ", getCurrentModalState())
      NativeModules.CustomLinkingModule.closeModalAndShowBtnSurface()
      closeModal()
      // console.log("modal State on closebtn: ", getCurrentModalState())
    }
  
    render() {
      console.log(" -------------------------------------------------- InfoPanel active ", this.state.active + " == " + "getCurrentModalState() " + getCurrentModalState());
      let url_or_path = this.props.infoImage.includes('//') ? {uri: this.props.infoImage } : asset(this.props.infoImage);

      return(
        <View>
        {getCurrentModalState() &&
  
          <View style={styles.infoPanel}>
              <VrButton
                style={styles.closeBtnContainer}
                onEnter={() => this.setState({hover: true})}
                onExit={() => this.setState({hover: false})}
                onClick={() => this.closePanel() }>
                  < Image source={{uri: "https://i.ibb.co/p3HtGWy/Navi-Icon-24.png"}} 
                    style={this.state.hover ?  styles.closeBtnHover : styles.closeBtn}
                  />
              </VrButton>
            { <Image source={url_or_path} style={{height: '70%', width: '100%'}} /> }
            <Text style={styles.text}>{ this.props.info }</Text>
          </View>
        }
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    infoPanel: {
        display: 'flex',
        width: 800,
        height: 950,
        opacity: 1,
        backgroundColor: '#CD853F',
        borderColor: '#D2B48C',
        borderWidth: 5,
        borderRadius: 20
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
    text: {
      fontSize: 25, 
      // color: "#000000",
      textAlign: 'center', 
      fontWeight: 'bold', 
      height: '20%', 
      width: '100%'
    }
  })
  