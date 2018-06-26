import React from 'react'
import playIcon from './play.svg'
import pauseIcon from './pause.svg'
import ForwardIcon from './skip-forward.svg'
import BackIcon from './skip-back.svg'

export const PlayButton = ({isPlaying, onClick}) => {
  const src = isPlaying ? pauseIcon : playIcon
  const alt = isPlaying ? 'pause button' : 'play button'
  return <img
    onClick={onClick}
    src={src}
    alt={alt}
  />
}

export const SkipForward = ({onClick}) => {
  return <img
    onClick={onClick}
    src={ForwardIcon}
    alt='skip forward'
  />
}

export const SkipBack = ({onClick}) => {
  return <img
    onClick={onClick}
    src={BackIcon}
    alt='skip forward'
  />
}
