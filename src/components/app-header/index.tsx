import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { headerLinks, IHeaderLink } from '@/services/local-data';
import {
  AppHeaderWrapper,
  HeaderLeft,
  HeaderRight,
  Search,
  SearchIconWrapper,
  StyledInputBase
} from './style';

export default memo(function AppHeader() {
  const showItem = (item: IHeaderLink, index: number) => {
    if (index < 3) {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      );
    } else {
      return <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>;
    }
  };

  return (
    <AppHeaderWrapper>
      <div className="wrap-v1 content">
        <HeaderLeft>
          <a className="logo sprite_01" href="#/">网易云音乐</a>
          <div className="select-list">
            {
              headerLinks.map((item: IHeaderLink, index: number) => {
                return (
                  <div className="select-item" key={item.title}>
                    {showItem(item, index)}
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="音乐/视频/电台/用户"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div className="center">创作者中心</div>
          <div className="">登录</div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </AppHeaderWrapper>
  );
});
