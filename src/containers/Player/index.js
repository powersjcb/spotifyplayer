import React from 'react'
import axios from 'axios'
import LoadingIcon from './loader.svg'
import Song from '../../components/Song/index'
import AudioController from '../../components/AudioController/index'

const searchUrl = 'https://api.spotify.com/v1/search'

class Player extends React.Component {
  // Player component will handle logic of what songs are playing
  constructor(props) {
    super(props)
    this.state = {
      current_song: 0,
      playlist: [],
    }
    this.fetchPlaylist = this.fetchPlaylist.bind(this)
    this.goBack = this.goBack.bind(this)
    this.goForward = this.goForward.bind(this)
  }

  componentDidMount() {
    this.fetchPlaylist()
  }

  fetchPlaylist() {
    const url = searchUrl +
                '?q=' + encodeURI(this.props.search) +
                '&type=track' +
                '&limit=10' +
                '&offset=0'
    axios.get(
      url,
      {headers: {'Authorization': 'Bearer ' + this.props.bearer_token}}
    ).then((response) => {
      // only include songs that have a preview track
      const songs = response.data.tracks.items.filter(song => song.preview_url)
      this.setState({playlist: songs})
    }).catch(e => console.log(e)) // todo: handle failures, 401 deletes creds
  }
  currentSong() {
    return this.state.playlist[this.state.current_song]
  }
  goBack() {
    if (this.state.current_song > 0) {
      this.setState({current_song: this.state.current_song - 1})
    }
  }
  goForward() {
    if (this.state.playlist.length - 1 === this.state.current_song) {
      this.props.handleFinished()
    } else {
      this.setState({current_song: this.state.current_song + 1})
    }
  }
  render() {
    const song = this.currentSong()
    if (!song) {
      return (
        <img
          src={LoadingIcon}
          alt="loading icon"
        />
      )
    }
    return (
      <div>
        <Song
          key={song.id}
          album={song.album}
          name={song.name}
          href={song.href}
          duration={song.duration}
        />
        <br/>

        <AudioController
          handleFinished={this.props.handleFinished}
          src={this.currentSong().preview_url}
          goBack={this.goBack}
          goForward={this.goForward}
        />
      </div>
    )
  }
}

export default Player