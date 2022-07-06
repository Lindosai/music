import React, { memo } from 'react';
import { getSizeImage } from '@/utils/format-utils';
import { AlbumWrapper } from './style';

interface IProps {
  info: any,
  size?: string,
  width?: string,
  bgp?: string
};

export default memo(function AlbumCover(props: IProps) {
  const { info, size = '100px', width = '118px', bgp = '-570px' } = props;

  return (
    <AlbumWrapper size={size} width={width} bgp={bgp}>
      <div className="album-image">
        <img src={getSizeImage(info.picUrl, 150)} alt="" />
        <a href="/abc" className="cover sprite_covor">{info.name}</a>
      </div>
      <div className="album-info">
        <p className="name">
          <a className="a-name" href={`/album?id=${info.id}`}>{info.name}</a>
        </p>
        <p className="artist">
          <a className="a-artist" href={`/artist?id=${info.artist.id}`}>{info.artist.name}</a>
        </p>
      </div>
    </AlbumWrapper>
  )
})
