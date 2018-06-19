import React from 'react'
import axios from 'axios'

const searchUrl = 'https://api.spotify.com/v1/search'

const Song = ({title, artist, url}) => (
  <li key={url}>
    {artist}: {title}
  </li>
)

class Playlist extends React.Component {
  // Playlist component will handle logic of what songs are playing
  constructor(props) {
    super(props)
    this.state = {
      current_song: 0,
      playlist: [{artist: 'The artist', title: "Song 1", url: 'https://google.com'}],
    }
    this.fetchPlaylist = this.fetchPlaylist.bind(this)
  }

  componentDidMount() {
    this.fetchPlaylist()
  }

  fetchPlaylist() {
    console.log('getting songs')
    const url = searchUrl +
                '?q=' + encodeURI(this.props.search) +
                '&type=track' +
                '&limit=10' +
                '&offset=0'

    axios.get(
      url,
      {headers: {'Authorization': 'Bearer ' + this.props.bearer_token}}
    )
  }

  render() {
    return (
      <div>
        <div>
          You are now listening to: {this.props.search}
        </div>
        <ul>
          {this.state.playlist.map((s) => {
            return (
              <Song
                key={s.url}
                artist={s.artist}
                title={s.title}
                url={s.url}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Playlist