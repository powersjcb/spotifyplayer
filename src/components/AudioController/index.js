import React from 'react'
import {PlayButton, SkipBack, SkipForward} from './buttons'
import MediaSlider from './slider'
import MenuIcon from './menu.svg'

class AudioController extends React.Component {
  audio = new Audio()  // audio element is a singleton

  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 30,
    }
    this.seek = this.seek.bind(this)
    this.handleSpacebar = this.handleSpacebar.bind(this)
    this.togglePlay = this.togglePlay.bind(this)
  }

  detatchAudioListeners() {
    this.audio.pause()
    this.audio.currentTime = 0
    // remove event listeners, stop audio
    for (const [key, value] of Object.entries(this.audioEvents)) {
      this.audio.removeEventListener(key, value)
    }
    document.removeEventListener('keypress', this.handleSpacebar)
    this.audio.src = null
  }

  attachAudioListeners(props) {
    this.audio.src = this.props.src
    this.audioEvents = {
      'timeupdate': () => {this.setState({currentTime: this.audio.currentTime})},
      'canplaythrough': () => {this.audio.play()},
      'loadedmetadata': () => {this.setState({duration: this.audio.duration})},
      'play': () => {this.setState({isPlaying: true})},
      'pause': () => {this.setState({isPlaying: false})},
      'ended': () => {this.props.goForward()},
      'error': () => {console.log('error occured')},  // todo: skip to next song
    }
    for (const [key, value] of Object.entries(this.audioEvents)) {
      this.audio.addEventListener(key, value)
    }
    document.addEventListener('keypress', this.handleSpacebar)
  }

  componentWillUnmount() {
    this.detatchAudioListeners()
  }

  componentDidMount() {
    this.attachAudioListeners(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.detatchAudioListeners()
      this.attachAudioListeners(nextProps)
    }
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
  // todo: refactor so there is a component that only receives variables used below
  render() {
    return (
      <div key={this.props.src}>
        <MediaSlider
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          seek={this.seek}
        />
        <img
          src={MenuIcon}
          alt="menu icon"
          onClick={this.props.handleFinished}
        />
        <SkipBack
          onClick={this.props.goBack}
        />
        <PlayButton
          isPlaying={this.state.isPlaying}
          onClick={this.togglePlay}
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
