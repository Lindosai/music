import styled, { StyledComponent } from '@emotion/styled';
import image from '../../../../../../assets/img/download.png';

export const BannerWrapper: StyledComponent<any> = styled.div`
  background: url(${(props: any) => props.bgImage}) center center/6000px;

  .banner {
    position: relative;
    display: flex;
    height: 270px;
  }

  .banner-item {
    .image {
      height: 270px;
    }
  }

  .download {
    position: absolute;
    right: 0;
    height: 270px;
    overflow: hidden;
  }

  .a-download {
    position: absolute;
    display: block;
    width: 215px;
    height: 56px;
    top: 186px;
    left: 19px;

    &:hover {
      background: url(${image}) no-repeat 0 -290px;
    }
  }
`;

const ArrowWrapper = styled.div`
  position: absolute;
  top: 50%;
  width: 37px;
  height: 63px;
  line-height: 63px;
  transform: translateY(-50%);

  .btn {
    height: 100%;
    width: 100%;
    background-image: url(${require("@/assets/img/banner_sprite.png")});
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }
`;

export const PrevArrowWrapper = styled(ArrowWrapper)`
  left: -68px;

  .left {
    background-position: 0 -360px;

    &:hover {
      background-position: 0 -430px;
    }
  }
`;

export const NextArrowWrapper = styled(ArrowWrapper)`
  right: -68px;

  .right {
    background-position: 0 -508px;

    &:hover {
      background-position: 0 -578px;
    }
  }
`;
