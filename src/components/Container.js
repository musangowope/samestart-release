import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
