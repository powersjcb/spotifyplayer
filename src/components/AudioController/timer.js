import React from 'react'

const Timer = ({currentTime, duration}) => {
  return (
    <span>{Math.trunc(currentTime)} / {Math.trunc(duration)}</span>
  )
}

export default Timer