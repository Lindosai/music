import React, { memo, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getBanner } from '../../store/actionCreators';
import Carousel from '@/components/carousel';
import { BannerWrapper, PrevArrowWrapper, NextArrowWrapper } from './style';
import image from '../../../../../../assets/img/download.png';

const PrevArrow = memo((props: any) => {
  const { onClick } = props;
  return (
    <PrevArrowWrapper>
      <button className="btn left" onClick={onClick}></button>
    </PrevArrowWrapper>
  );
});

const NextArrow = memo((props: any) => {
  const { onClick } = props;
  return (
    <NextArrowWrapper>
      <button className="btn right" onClick={onClick}></button>
    </NextArrowWrapper>
  );
});

export default memo(function TopBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const { banners } = useSelector((state: any) => ({
    banners: state.getIn(['recommend', 'topBanners'])
  }), shallowEqual);

  useEffect(() => {
    dispatch<any>(getBanner());
  }, [dispatch]);

  const bannerChange = useCallback((from: number, to: number) => {
    setCurrentIndex(to);
  }, []);

  const bgImage = banners &&
    banners[currentIndex] &&
    (banners[currentIndex].imageUrl + "?imageView&blur=40x20");
  
  const prevArrow: JSX.Element = <PrevArrow />;
  const nextArrow: JSX.Element = <NextArrow />;

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <Carousel
          autoplay={false}
          prevArrow={prevArrow}
          nextArrow={nextArrow}
          beforeChange={bannerChange}
        >
          {
            banners.map((banner: any) => (
              <div className="banner-item" key={banner.imageUrl}>
                <img className="image" src={banner.imageUrl} alt={banner.typeTitle} />
              </div>
            ))
          }
        </Carousel>
        <div className="download">
          <img className="img-download" src={image} />
          <a className="a-download" href="/download" />
        </div>
      </div>
    </BannerWrapper>
  )
});
