import React from 'react'
import axios from 'axios'

const searchUrl = 'https://api.spotify.com/v1/search'

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
      const songs = response.data.tracks.items
      this.setState({playlist: songs})
      console.log(songs)
    }).catch(e => console.log(e))
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
                key={s.id}
                album={s.album}
                name={s.name}
                href={s.href}
                duration={s.duration}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Playlist