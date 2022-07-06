import styled, { StyledComponent } from '@emotion/styled';

export const AlbumWrapper: StyledComponent<any> = styled.div`
  .album-image {
    position: relative;
    margin-top: 15px;
    margin-bottom: 7px;
    width: ${(props: any) => props.width};
    height: ${(props: any) => props.size};
    overflow: hidden;

    img {
      width: ${(props: any) => props.size};
      height: ${(props: any) => props.size};
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: 0 ${(props: any) => props.bgp};
      text-indent: -9999px;
    }
  }

  .album-info {
    font-size: 12px;
    width: ${(props: any) => props.size};

    p {
      width: 90%;
      line-height: 18px;
      cursor: pointer;
    }

    .name {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .a-name {
      color: #000;
    }

    .a-artist {
      color: #666;
    }
  }
`
