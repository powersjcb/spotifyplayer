import React from 'react'
import axios from 'axios'
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
    }).catch(e => console.log(e)) // todo: handle failures
  }

  currentSong() {
    return this.state.playlist[this.state.current_song]
  }

  render() {
    const song = this.currentSong()
    return (
      <div>
        {song &&
          <Song
            key={song.id}
            album={song.album}
            name={song.name}
            href={song.href}
            duration={song.duration}
          />
        }
        <br/>
        {this.currentSong() && <AudioController src={this.currentSong().preview_url}/>}
      </div>
    )
  }
}

export default Player