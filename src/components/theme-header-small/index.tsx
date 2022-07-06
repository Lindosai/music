import React, { memo } from 'react';
import { HeaderWrapper } from './style';

interface IProps {
  title?: string,
  more?: string
}

const ThemeHeaderSmall = memo(function (props: IProps) {
  const { title, more } = props;

  return (
    <HeaderWrapper>
      <h3>{title}</h3>
      <a href="/abc">{more}</a>
    </HeaderWrapper>
  )
})

export default ThemeHeaderSmall;
