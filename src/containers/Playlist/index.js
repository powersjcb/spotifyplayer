import React from 'react'
import axios from 'axios'

const searchUrl = 'https://api.spotify.com/v1/search'

const Player = ({src}) => (
  <audio controls>
    <source src={src} type="audio/mpeg"/>
  </audio>
)

const Album = ({name, images, artists}) => (
  <div>
    {name}
    <span>{artists.map(a => a.name).join(', ')}</span>
    <img src={images[0].url} alt=""/>
  </div>
)

const Song = ({album, duration, href, name}) => (
  <li>
    <Album
      name={album.name}
      images={album.images}
      artists={album.artists}
    />
  </li>
)

class Playlist extends React.Component {
  // Playlist component will handle logic of what songs are playing
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
    console.log('getting songs')
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
      console.log(songs)
    }).catch(e => console.log(e))
  }

  currentSongUrl() {
    console.log(this.state.playlist[this.state.current_song])
    return this.state.playlist[this.state.current_song].preview_url
  }

  render() {
    const player = this.state.playlist.length ? <Player src={this.currentSongUrl()}/> : null
    return (
      <div>
        <div>
          You are now listening to: {this.props.search}
        </div>
        <ul>
          {this.state.playlist.map((s) => {
            return (
              <Song
                key={s.id}
                album={s.album}
                name={s.name}
                href={s.href}
                duration={s.duration}
              />
            )
          })}
        </ul>
        {player}
      </div>
    )
  }
}

export default Playlist