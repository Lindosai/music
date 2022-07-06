import React, { memo } from 'react';
import Slider, { Settings } from 'react-slick';
import { CarouselWrapper } from './style';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

interface ICarousel {
  children: any,
  dots?: boolean,
  autoplay?: boolean,
  speed?: number,
  slidesToShow?: number,
  slidesToScroll?: number,
  prevArrow?: JSX.Element | null,
  nextArrow?: JSX.Element | null,
  beforeChange?: (from: number, to: number) => void,
  afterChange?: (currentSlide: number) => void,
}

const Carousel = memo((props: ICarousel) => {
  const {
    children,
    dots,
    autoplay,
    speed,
    slidesToShow,
    slidesToScroll,
    prevArrow,
    nextArrow,
    beforeChange,
    afterChange
  } = props;

  const settings: Settings = {
    dots: dots ?? true,
    autoplay: autoplay ?? true,
    speed: speed ?? 500,
    slidesToShow: slidesToShow ?? 1,
    slidesToScroll: slidesToScroll ?? 1,
    prevArrow: prevArrow ?? null,
    nextArrow: nextArrow ?? null,
    beforeChange: beforeChange ?? (() => { return }),
    afterChange: afterChange ?? (() => { return }),
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {children}
      </Slider>
    </CarouselWrapper>
  );
});

export default Carousel;
