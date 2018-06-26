import React from 'react'
import styled from 'styled-components';

const Song = ({album, name}) => {
  const imgUrl = album.images[0].url
  // todo: paramaterize display
  const AlbumDiv = styled.div`
    background-image: url(${imgUrl});
    background-position: center; 
    background-size: auto;
    background-repeat: no-repeat;
    width: 300px;
    height: 300px;
    position: relative;
    z-index: -1;
  `
  const Label = styled.div`
    color: snow;
    background-color: rgba(0, 0, 0, 0.9);
    position: absolute;
    padding-top: 1em;
    padding-bottom: 1em;
    bottom: 0px;
    width: 100%;
  `
  const LabelItem = styled.div`
    padding-left: 1em;
  `
  return (
    <AlbumDiv>
      <Label>
        <LabelItem>{album.artists.map(a => a.name).join(', ')}</LabelItem>

        <LabelItem>{name}</LabelItem>
      </Label>
    </AlbumDiv>
  )
}

export default Song