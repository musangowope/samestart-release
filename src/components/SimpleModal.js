import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { handleOutsideElementClick } from 'functions/handleOutsideElementClick.func';
import styled from 'styled-components';
import { transparentize } from 'polished';
import themed from 'functions/themed';

const Modal = styled.div`
  top: ${({ isOpen }) => (isOpen ? 0 : '100%')};
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: 999;
  transition: top ${(props) => props.transitionDuration}ms ease-in-out,
    opacity ${(props) => props.transitionDuration}ms ease-in-out;
`;

const ModalOverlay = styled.div`
  background-color: ${(props) =>
    transparentize(0.5, props.theme.colors.baseColor)};
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.colors.white};
  max-width: ${(props) => props.theme.breakpoints.md};
  overflow-x: hidden;
  width: 100%;
  margin: auto;
  max-height: 100vh;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    height: 100vh;
    max-height: 100vh;
  }
`;

const SimpleModal = ({
  isOpen,
  closeAction,
  children,
  transitionDuration,
  onTransitionEnd,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    window.setTimeout(() => {
      onTransitionEnd();
    }, transitionDuration);
  }, [onTransitionEnd, transitionDuration]);

  useEffect(() => {
    const handleOutsideClick = (e) =>
      handleOutsideElementClick(modalRef, e, closeAction);
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalRef, closeAction]);

  return (
    <Modal
      className="simple-modal"
      isOpen={isOpen}
      transitionDuration={transitionDuration}
    >
      <ModalOverlay className="simple-modal__overlay">
        <ModalContent
          className="simple-modal__content"
          ref={modalRef}
        >
          {children}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

SimpleModal.propTypes = {
  isOpen: PropTypes.bool,
  closeAction: PropTypes.func.isRequired,
  children: PropTypes.any,
  transitionDuration: PropTypes.number,
  onTransitionEnd: PropTypes.func,
};
SimpleModal.defaultProps = {
  isOpen: false,
  children: null,
  transitionDuration: 250,
  onTransitionEnd: () => false,
};

export default themed(SimpleModal);
