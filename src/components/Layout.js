import React from 'react';
import PropTypes from 'prop-types';
import SSNavbar, { NavHeight } from './SSNavbar';
import styled from 'styled-components';

// margin-top: ${(props) =>
//     props.hasMarginTop ? `${NavHeight}px` : 0};

const LayoutContent = styled.div`
  height: 100%;
`;

const Layout = ({ children, hasMarginTop }) => (
  <LayoutWrapper hasMarginTop={hasMarginTop}>
    <SSNavbar />
    <LayoutContent>{children}</LayoutContent>
  </LayoutWrapper>
);

Layout.propTypes = {
  hasMarginTop: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  hasMarginTop: false,
};

export default Layout;
