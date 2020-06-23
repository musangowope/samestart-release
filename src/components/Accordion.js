import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import styled from 'styled-components';

const PressableArea = styled.div`
  outline: none;
`;

const Accordion = ({
  itemKey,
  children: childRenderer,
  duration,
  cbToggleFn,
  pressPointContent,
  containerClass,
  isOpenInitially,
}) => {
  const [height, setHeight] = useState(isOpenInitially ? 'auto' : 0);

  const toggle = () => {
    cbToggleFn();
    setHeight(height === 0 ? 'auto' : 0);
  };

  const close = () => setHeight(0);
  const open = () => setHeight('auto');

  return (
    <div className={containerClass}>
      <PressableArea
        onKeyPress={() => null}
        role="button"
        tabIndex={itemKey + 1}
        onClick={toggle}
      >
        <React.Fragment>{pressPointContent}</React.Fragment>
      </PressableArea>
      <AnimateHeight height={height} duration={duration}>
        {typeof childRenderer === 'function'
          ? childRenderer(close, open, toggle)
          : childRenderer}
      </AnimateHeight>
    </div>
  );
};

Accordion.propTypes = {
  itemKey: PropTypes.number,
  children: PropTypes.any,
  duration: PropTypes.number,
  cbToggleFn: PropTypes.func,
  pressPointContent: PropTypes.any,
  containerClass: PropTypes.string,
  isOpenInitially: PropTypes.bool,
};

Accordion.defaultProps = {
  title: '',
  itemKey: 0,
  children: null,
  duration: 200,
  cbToggleFn: () => false,
  pressPointContent: null,
  containerClass: '',
  isOpenInitially: false,
};

export default Accordion;
