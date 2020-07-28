import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  animation-duration: 250ms;
`;

const AnimationContainer = ({
  duration,
  animatedClassName,
  children,
}) => {
  return (
    <Container
      duration={duration}
      className={`animate__animated ${animatedClassName}`}
    >
      {children}
    </Container>
  );
};

AnimationContainer.propTypes = {
  animatedClassName: PropTypes.string,
  duration: PropTypes.number,
  children: PropTypes.any,
};
AnimationContainer.defaultProps = {
  animatedClassName: '',
  duration: 250,
  children: null,
};

export default AnimationContainer;
