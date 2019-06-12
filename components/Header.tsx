import NProgress from 'nprogress';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <div className="bar">
    <Nav />
  </div>
);

export default Header;
