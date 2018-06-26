import React from 'react'
import playIcon from './play.svg'
import pauseIcon from './pause.svg'

const PlayButton = ({isPlaying, onClick}) => {
  const src = isPlaying ? pauseIcon : playIcon
  const alt = isPlaying ? 'pause button' : 'play button'
  return <img
    onClick={onClick}
    src={src}
    alt={alt}
  />
}

export default PlayButton