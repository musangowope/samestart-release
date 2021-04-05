import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { handleOutsideElementClick } from 'functions/handleOutsideElementClick.func';
import styled from 'styled-components';
import { transparentize } from 'polished';
import themed from 'functions/themed';
import ReactDOM from 'react-dom';
import useScrollBlock from '../custom-hooks/useScrollBlock';

const SimpleModal = ({
  isOpen,
  closeAction,
  children,
  transitionDuration,
  onTransitionEnd,
  onModalOpen,
  extraOuterStyles,
  extraOverlayStyles,
  extraModalContentStyles,
  lockScreenScroll,
}) => {
  const modalRef = useRef();
  const [blockScroll, allowScroll] = useScrollBlock();

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

  useEffect(() => {
    if (isOpen && lockScreenScroll) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [allowScroll, blockScroll, isOpen, lockScreenScroll]);

  useEffect(() => {
    if (isOpen) {
      onModalOpen();
    }
  }, [isOpen, onModalOpen]);

  return ReactDOM.createPortal(
    <Modal
      className="simple-modal"
      isOpen={isOpen}
      transitionDuration={transitionDuration}
      $style={extraOuterStyles}
    >
      <ModalOverlay
        className="simple-modal__overlay"
        $style={extraOverlayStyles}
      >
        <ModalContent
          className="simple-modal__content"
          ref={modalRef}
          $style={extraModalContentStyles}
        >
          {children}
        </ModalContent>
      </ModalOverlay>
    </Modal>,
    document.querySelector('#modal'),
  );
};

SimpleModal.propTypes = {
  lockScreenScroll: PropTypes.bool,
  isOpen: PropTypes.bool,
  closeAction: PropTypes.func.isRequired,
  children: PropTypes.any,
  transitionDuration: PropTypes.number,
  onTransitionEnd: PropTypes.func,
  onModalOpen: PropTypes.func,
  extraOuterStyles: PropTypes.object,
  extraOverlayStyles: PropTypes.object,
  extraModalContentStyles: PropTypes.object,
};
SimpleModal.defaultProps = {
  lockScreenScroll: false,
  isOpen: false,
  children: null,
  transitionDuration: 250,
  onTransitionEnd: () => false,
  onModalOpen: () => false,
  extraOuterStyles: {},
  extraOverlayStyles: {},
  extraModalContentStyles: {},
};

export default themed(SimpleModal);

const Modal = styled.div`
  top: ${({ isOpen }) => (isOpen ? 0 : '100%')};
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: top ${(props) => props.transitionDuration}ms ease-in-out,
    opacity ${(props) => props.transitionDuration}ms ease-in-out;
  ${(props) => (props.$style ? props.$style : {})}
`;

const ModalOverlay = styled.div`
  background-color: ${(props) =>
    transparentize(0.5, props.theme.colors.baseColor)};
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  ${(props) => (props.$style ? props.$style : {})}
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
  ${(props) => (props.$style ? props.$style : {})}
`;
