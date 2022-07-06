import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAlbum } from '../../store/actionCreators';
import Carousel from '@/components/carousel';
import ThemeHeaderRCM from '@/components/theme-header-rcm';
import AlbumCover from '@/components/album-cover';
import { AlbumWrapper, PrevArrowWrapper, NextArrowWrapper } from './style';

const PrevArrow = memo((props: any) => {
  const { onClick } = props;
  return (
    <PrevArrowWrapper>
      <button className="btn left sprite_02" onClick={onClick}></button>
    </PrevArrowWrapper>
  );
});

const NextArrow = memo((props: any) => {
  const { onClick } = props;
  return (
    <NextArrowWrapper>
      <button className="btn right sprite_02" onClick={onClick}></button>
    </NextArrowWrapper>
  );
});

export default memo(function NewAlbum(props) {
  const { newAlbum } = useSelector((state: any) => ({
    newAlbum: state.getIn(['recommend', 'newAlbum'])
  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getAlbum());
  }, [dispatch]);

  const prevArrow = <PrevArrow />;
  const nextArrow = <NextArrow />;

  return (
    <AlbumWrapper>
      <ThemeHeaderRCM title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <div className="album">
          <Carousel
            autoplay={false}
            dots={false}
            prevArrow={prevArrow}
            nextArrow={nextArrow}
            slidesToShow={5}
            slidesToScroll={5}
          >
            {
              newAlbum.map((album: any) => (
                <AlbumCover info={album} key={album.id} />
              ))
            }
          </Carousel>
        </div>
      </div>
    </AlbumWrapper>
  )
});
