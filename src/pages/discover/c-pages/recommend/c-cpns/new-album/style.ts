import styled from '@emotion/styled';

export const AlbumWrapper = styled.div`
  margin-top: 50px;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 37px;
    height: 186px;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;

    .arrow {
      width: 30px;
      height: 17px;
      cursor: pointer;
    }

    .arrow-left {
      background-position: -260px -75px;
    }

    .arrow-right {
      background-position: -300px -75px;
    }

    .album {
      width: 640px;
      height: 158px;

      .ant-carousel .slick-slide {
        height: 158px;
        overflow: hidden;
      }

      .page {
        display: flex !important;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;

const ArrowWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  .btn {
    width: 20px;
    height: 17px;
    cursor: pointer;
  }
`;

export const PrevArrowWrapper = styled(ArrowWrapper)`
  left: -20px;

  .left {
    background-position: -260px -75px;

    &:hover {
      background-position: -280px -75px;
    }
  }
`;

export const NextArrowWrapper = styled(ArrowWrapper)`
  right: -20px;

  .right {
    background-position: -300px -75px;

    &:hover {
      background-position: -320px -75px;
    }
  }
`;
