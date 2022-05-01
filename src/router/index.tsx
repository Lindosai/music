import React from 'react';
import { Redirect } from 'react-router-dom';

const Discover = React.lazy(() => import('../pages/discover'));
const Player = React.lazy(() => import('../pages/player'));
const Friend = React.lazy(() => import('../pages/friend'));
const Mine = React.lazy(() => import('../pages/mine'));

export default [
  {
    path: '/',
    exact: true,
    render: () => (
      <Redirect to="/discover" />
    )
  },
  {
    path: '/discover',
    component: Discover,
    // routes: [
    //   {
    //     path: '/discover',
    //     exact: true,
    //     render: () => (
    //       <Redirect to={"/discover/artist"} />
    //     )
    //   },
    // ]
  },
  {
    path: '/player',
    component: Player
  },
  {
    path: '/friend',
    component: Friend
  },
  {
    path: '/mine',
    component: Mine
  }
];
