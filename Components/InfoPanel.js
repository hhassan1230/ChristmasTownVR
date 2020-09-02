import React, {Component} from 'react';
import {
  AppRegistry,
  asset,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';

import {Surface} from 'react-360-web';
const surfaceModule = NativeModules.surfaceModule;

class InfoPanel extends React.Component {
  state = {
  	active: getCurrentModalState(),
  	id: null,
    img: {
      name: 'info.png',
      width: 100,
      height: 100
    }
  }

  transformDisplay(id) {
    this._changeSurfaceDimensions(500, 400, id);
    this.setState({img: {
      name: this.props.infoImage,
        width: 500,
        height: 300
      }
    });
  }

  resetPanel(id) {
    this._changeSurfaceDimensions(100, 100, id);
    this.setState({img: {
      name: 'info.png',
        width: 100,
        height: 100
      }
    });
  }

  _changeSurfaceDimensions(width, height, id) {
    surfaceModule.resizeSurface(width, height, id);
  }

  render() {
    let { img } = this.state;

    return (
      <View style={styles.displayPanel}
            hitSlop={30}
            onEnter={() => this.transformDisplay(this.props.id)}
            onExit={() => this.resetPanel(this.props.id)}>
        <Image source={asset(`${img.name}`)} style={{width: img.width, height: img.height}} />
        <View style={styles.attractionBox}>
          <Text style={styles.attractionText}>
            {this.props.info}
          </Text>
        </View>
      </View>
    );
  }
};
