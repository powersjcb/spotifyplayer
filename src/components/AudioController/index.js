import React from 'react'
import {PlayButton, SkipBack, SkipForward} from './buttons'
import MediaSlider from './slider'
import Timer from './timer'

class AudioController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 30,
    }
    this.seek = this.seek.bind(this)
    this.handleSpacebar = this.handleSpacebar.bind(this)
  }

  componentWillUnmount() {
    this.audio.pause()
    // remove event listeners, stop audio
    for (const [key, value] of Object.entries(this.audioEvents)) {
      this.audio.removeEventListener(key, value)
    }
    document.removeEventListener('keypress', this.handleSpacebar)
  }

  componentDidMount() {
    // generate audio element, attach event listeners
    this.audio = new Audio(this.props.src)
    this.audioEvents = {
      'timeupdate': () => {this.setState({currentTime: this.audio.currentTime})},
      'canplaythrough': () => {this.audio.play()},
      'loadedmetadata': () => {this.setState({duration: this.audio.duration})},
      'play': () => {this.setState({isPlaying: true})},
      'pause': () => {this.setState({isPlaying: false})},
      'error': () => {console.log('error occured')},  // todo: skip to next song
    }
    for (const [key, value] of Object.entries(this.audioEvents)) {
      this.audio.addEventListener(key, value)
    }
    document.addEventListener('keypress', this.handleSpacebar)
  }

  handleSpacebar(event) {
    if (event.key === ' ' || event.key === 'Spacebar' ) {
      event.preventDefault()
      this.togglePlay()
    }
  }

  seek(position) {
    // position: float 0.0 - 1.0, representing the position in the track
    this.audio.currentTime = position * this.state.duration
  }

  togglePlay() {
    if (this.state.isPlaying) {
      this.audio.pause()
    } else {
      this.audio.play()
    }
  }

  render() {
    return (
      <div>
        <MediaSlider
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          seek={this.seek}
        />
        <Timer
          currentTime={this.state.currentTime}
          duration={this.state.duration}
        />
        <SkipBack
          onClick={this.props.goBack}
        />
        <PlayButton
          isPlaying={this.state.isPlaying}
          onClick={() => {this.togglePlay()}}
        />
        <SkipForward
          onClick={this.props.goForward}
        />
      </div>
    )
  }
}

export default AudioController

// icons sourced from:
// https://feathericons.com/
