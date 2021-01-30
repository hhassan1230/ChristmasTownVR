import React from 'react';
import {
  Video,
  View,
  VideoControl,
  MediaPlayerState,
} from 'react-360';
// This is the VideoElement Component which is in charge of rendering the video
// No Need to touch this file
export default class PanelVideoElement extends React.Component {
  constructor(props){
    super();
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, loop: true, muted: false}), // init with muted, autoPlay
    }
  }

	static defaultProps = {
		video: 'static.mp4',
        playing: 'pause',
        videoControllerStyles: {height: "10%"},
        videoStyles: {height: "80%", borderWidth: 5,},
	};

  render() {
    const { playing, video, videoStyles, videoControllerStyles } = this.props;
    console.log(video)
    return (
        <View
          style={{
            height: "80%",
            paddingLeft: 30,
            paddingRight:30,
            paddingTop: 45,
          }}>
            <Video style={videoStyles} loop={true} playControl={playing} playerState={this.state.playerState} autoPlay={false} source={video} />
            <VideoControl style={videoControllerStyles} playerState={this.state.playerState} />
        </View>
    )
  }
}
