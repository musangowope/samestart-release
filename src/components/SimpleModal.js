import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { handleOutsideElementClick } from 'functions/handleOutsideElementClick.func';
import styled from 'styled-components';
import { transparentize } from 'polished';
import themed from 'functions/themed';
import { NavHeight } from './SSNavbar';

const Modal = styled.div`
  top: ${({ isOpen }) => (isOpen ? 0 : '100%')};
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: 999;
  transition: top 0.2s ease-in-out, opacity 0.2s ease-in-out;
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
  max-height: calc(100vh - ${NavHeight * 2}px);
  height: calc(100vh - ${NavHeight * 2}px);
  overflow-y: auto;
  position: relative;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    height: 100vh;
    max-height: 100vh;
  }
`;

const SimpleModal = ({ isOpen, closeAction, children }) => {
  const modalRef = useRef();
  useEffect(() => {
    const handleOutsideClick = (e) =>
      handleOutsideElementClick(modalRef, e, closeAction);
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalRef, closeAction]);

  return (
    <Modal className="simple-modal" isOpen={isOpen}>
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
};
SimpleModal.defaultProps = {
  isOpen: false,
  children: null,
};

export default themed(SimpleModal);
