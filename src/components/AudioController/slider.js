import React from 'react'
import styled from 'styled-components'

const Slider = ({currentTime, duration}) => {
  const seek = currentTime / duration
  const SliderDiv = styled.div`
    height: 3px;
    width: ${seek * 100}%;
    background-color: red;
  `
  return (
    <SliderDiv/>
  )
}

const SliderWrapper = styled.div`
  cursor: pointer;
  background-color: lightgrey;
  height: 5px;
  width: 100%;
`

class MediaSlider extends React.Component {
  constructor(props) {
    super(props)
    this.slider = React.createRef()
  }
  render() {
    return (
      <SliderWrapper
        innerRef={this.slider} // hmm, has to use innerRef instead of ref for styled-components
        onMouseUp={(event) => {
          const targetBox = this.slider.current.getClientRects()[0]
          const value = (event.pageX - targetBox.left) / targetBox.width
          this.props.seek(value)
        }}
      >
        <Slider
          currentTime={this.props.currentTime}
          duration={this.props.duration}
        />
      </SliderWrapper>
    )
  }
}

export default MediaSlider