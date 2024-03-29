import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useIsMobile from '../../custom-hooks/useIsMobile';
import styled, { css } from 'styled-components';
import InlineSVG from 'react-inlinesvg';
import EyeSrc from '../../svgs/eye.svg';
import DownArrowSrc from '../../svgs/down-arrow.svg';
import themed from '../../functions/themed';
import { transparentize } from 'polished';
import PrismaZoom from 'react-prismazoom';
import SlideController from './SlideController';
import ZoomController from './ZoomController';
import Accordion from '../Accordion';
import SimpleModal from '../SimpleModal';
import orientations from '../../constants/orientations';
import {
  closeFullScreen,
  requestFullScreen,
} from '../../functions/toggleFullScreen.func';

import useOrientationChange from '../../custom-hooks/useOrientationChange';
import { scrollToElement } from '../../functions/scrollToElement.func';

const Gallery = ({
  galleryItems,
  galleryCaption,
  activeSlideNumber,
  isGalleryModalOpen,
  onNextSlideClick,
  onPrevSlideClick,
  onCloseClick,
  onOpenButtonClick,
}) => {
  const [displayControllers, setDisplayControllers] =
    React.useState(false);
  let controllerTimeout = useRef();
  React.useEffect(() => {
    if (displayControllers) {
      controllerTimeout.current = setTimeout(() => {
        setDisplayControllers(false);
      }, 4000);
      return () => clearTimeout(controllerTimeout);
    }
  }, [displayControllers]);

  const prismaRef = React.useRef();
  const galleryContainerRef = React.useRef();
  const isMobileVpWidth = useIsMobile();
  const screenOrientation = useOrientationChange();

  const accordianRef = React.useRef();
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);

  React.useEffect(() => {
    if (accordianRef) {
      if (isAccordionOpen) {
        accordianRef.current.open();
      } else {
        accordianRef.current.close();
      }
    }
  }, [isAccordionOpen]);

  const handleToggleBtnClick = () =>
    setIsAccordionOpen((prev) => !prev);

  const handleCloseGalleryModal = () => {
    if (isGalleryModalOpen) {
      if (prismaRef) {
        prismaRef.current.reset();
      }
      onCloseClick();
      closeFullScreen();
      window.setTimeout(() => {
        scrollToElement(galleryContainerRef.current, 0, 'auto');
      }, 250);
    }
  };

  const handleOpenGallery = () => {
    if (isMobileVpWidth) {
      requestFullScreen();
    }
    onOpenButtonClick();
  };

  const handleIncrementSlideNumber = () => {
    handleResetZoom();
    onNextSlideClick(activeSlideNumber);
  };

  const handleDecrementSlideNumber = () => {
    handleResetZoom();
    onPrevSlideClick(activeSlideNumber);
  };

  const handleGalleryZoomOut = () => {
    if (prismaRef) {
      prismaRef.current.zoomOut(1);
    }
  };

  const handleGalleryZoomIn = () => {
    if (prismaRef) {
      prismaRef.current.zoomIn(1);
    }
  };

  const onZoomChange = (zoom = 1) => {
    setDisplayControllers(true);
    setZoom(zoom);
  };

  const handleResetZoom = () => {
    if (prismaRef) {
      prismaRef.current.reset();
    }
  };

  const onModalTap = () => {
    clearTimeout(controllerTimeout.current);
    setDisplayControllers((prevState) => !prevState);
  };

  return (
    <div ref={galleryContainerRef}>
      <StyledActionHeader>
        <div>
          <StyledPretitle>Gallery Study</StyledPretitle>
          <StyleGalleryCaption>{galleryCaption}</StyleGalleryCaption>
        </div>
        <StyledActionButtonsWrapper>
          <StyledViewGalleryButton
            onClick={() => handleOpenGallery(0)}
          >
            <InlineSVG src={EyeSrc} />
          </StyledViewGalleryButton>
          <StyledVisibilityButton
            onClick={handleToggleBtnClick}
            isAccordionOpen={isAccordionOpen}
          >
            <InlineSVG src={DownArrowSrc} />
          </StyledVisibilityButton>
        </StyledActionButtonsWrapper>
      </StyledActionHeader>

      <Accordion ref={accordianRef}>
        <div className="columns is-multiline">
          {galleryItems.map(({ imgSrc, slideCaption }, index) => (
            <div className="column is-half" key={`gallery_${index}`}>
              <StyledSlideItem
                onKeyPress={() => null}
                role="button"
                tabIndex={index + 1}
                onClick={() => handleOpenGallery(index)}
              >
                <StyledSlideItemImg src={imgSrc} />
                <StyledSlideItemContent>
                  <StyledItemLeftSide>
                    <StyledItemNumber>{index + 1}</StyledItemNumber>
                    <StyledTitle>{slideCaption}</StyledTitle>
                  </StyledItemLeftSide>
                  <StyledIconWrapper>
                    <InlineSVG src={EyeSrc} />
                  </StyledIconWrapper>
                </StyledSlideItemContent>
              </StyledSlideItem>
            </div>
          ))}
        </div>
      </Accordion>

      <SimpleModal
        lockScreenScroll
        isOpen={isGalleryModalOpen}
        closeAction={onCloseClick}
        extraModalContentStyles={css`
          max-width: 100%;
          overflow: hidden;
        `}
      >
        <ZoomWrapper
          isMobileVpWidth={isMobileVpWidth}
          onKeyPress={() => null}
          role="button"
          tabIndex={1}
          onClick={onModalTap}
        >
          <PrismaZoom
            onZoomChange={onZoomChange}
            className="prisma-zoom"
            ref={prismaRef}
          >
            <div className="prisma-zoom__inner">
              <img
                className="prisma-zoom__inner__image"
                src={galleryItems[activeSlideNumber].imgSrc}
                alt={galleryCaption}
              />
            </div>
          </PrismaZoom>
        </ZoomWrapper>

        <StyledZoomControllerWrapper
          showController={displayControllers}
          screenOrientation={screenOrientation}
        >
          <ZoomController
            zoomInFn={handleGalleryZoomIn}
            zoomOutFn={handleGalleryZoomOut}
            closeFn={handleCloseGalleryModal}
            resetZoomFn={handleResetZoom}
            currentZoomPercentage={`${parseInt(zoom) * 100}%`}
          />
        </StyledZoomControllerWrapper>

        <StyledControllerWrapper
          showController={displayControllers}
          screenOrientation={screenOrientation}
        >
          <SlideController
            currentSlideNumber={activeSlideNumber}
            nextBtnFn={handleIncrementSlideNumber}
            prevBtnFn={handleDecrementSlideNumber}
          />
        </StyledControllerWrapper>
      </SimpleModal>
    </div>
  );
};

Gallery.propTypes = {
  galleryCaption: PropTypes.string,
  blockKey: PropTypes.string,
  galleryItems: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      slideCaption: PropTypes.string,
    }),
  ),
  activeSlideNumber: PropTypes.number,
  isGalleryModalOpen: PropTypes.bool,
  onNextSlideClick: PropTypes.func,
  onPrevSlideClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  onOpenButtonClick: PropTypes.func,
};

Gallery.defaultProps = {
  galleryCaption: '',
  galleryItems: [],
  blockKey: '',
  activeSlideNumber: false,
  isGalleryModalOpen: false,
  onNextSlideClick: () => false,
  onPrevSlideClick: () => false,
  onCloseClick: () => false,
  onOpenButtonClick: () => false,
};

export default themed(Gallery);

const StyledActionHeader = styled.div`
  background-color: ${(props) => props.theme.colors.tertiary};
  color: white;
  padding: ${(props) => props.theme.marginPaddings[2]};
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  margin-bottom: 20px;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledPretitle = styled.div`
  color: ${(props) => props.theme.colors.primary};
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const StyleGalleryCaption = styled.div`
  font-size: ${(props) => props.theme.fontSizes[4]};
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const StyledActionButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StyledViewGalleryButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  box-shadow: none;
  border: 2px solid white;
  margin-left: 5px;
  margin-right: 5px;
  svg {
    width: 30px;
    height: auto;
  }
`;

const StyledVisibilityButton = styled(StyledViewGalleryButton)`
  svg {
    transition: transform 300ms ease-in-out;
    width: 25px;
    height: auto;
    transform: rotate(
      ${(props) => (props.isAccordionOpen ? `180deg` : `0`)}
    );
  }
`;

StyledVisibilityButton.defaultProps = {
  isAccordionOpen: false,
};

const StyledSlideItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 50px;
  color: white;

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;
const StyledSlideItemImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-position: center;
  object-fit: cover;
  transition: transform 500ms ease-in-out;
`;
const StyledSlideItemContent = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    transparentize(0.4, props.theme.colors.black)};
  padding: ${(props) => props.theme.marginPaddings[3]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledItemLeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledItemNumber = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${(props) => props.theme.colors.primary};
  margin-right: ${(props) => props.theme.marginPaddings[2]};
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    display: none;
  }
`;
const StyledTitle = styled.div``;
const StyledIconWrapper = styled.div`
  svg {
    width: 30px;
    height: auto;
  }
`;

const StyledControllerWrapper = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  width: 200px;
  height: 65px;
  margin: auto auto 25px;
  opacity: ${({ showController }) => (showController ? 1 : 0)};
  visibility: ${({ showController }) => (showController ? 1 : 0)};
  transition: opacity 500ms ease-in-out, visibility ease-in-out 500ms;

  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    ${({ screenOrientation }) => {
      if (screenOrientation !== orientations.landscape_secondary) {
        return css`
          margin-right: -60px;
          margin-bottom: auto;
          transform: rotate(-90deg);
        `;
      }
      return css``;
    }}
  }
`;

StyledControllerWrapper.defaultProps = {
  screenOrientation: orientations.portrait_primary,
  showController: false,
};

const StyledZoomControllerWrapper = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  width: 220px;
  height: 65px;
  margin: 25px 65px auto auto;
  opacity: ${({ showController }) => (showController ? 1 : 0)};
  visibility: ${({ showController }) => (showController ? 1 : 0)};
  transition: opacity 500ms ease-in-out, visibility ease-in-out 500ms;

  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    ${({ screenOrientation }) => {
      if (screenOrientation !== orientations.landscape_secondary) {
        return css`
          margin-top: 135px;
          margin-left: -65px;
          margin-right: auto;
          transform: rotate(-90deg);
        `;
      }
      return css``;
    }}
  }
`;

StyledZoomControllerWrapper.defaultProps = {
  screenOrientation: orientations.portrait_primary,
  showController: false,
};

const ZoomWrapper = styled.div`
  height: 100%;
  .prisma-zoom {
    height: 100%;
  }

  .prisma-zoom__inner {
    @media screen and (max-width: ${(props) =>
        props.theme.breakpoints.sm}) {
      height: 100vw;
      transform: rotate(-90deg);
      transform-origin: left top;
      width: 100vh;
      overflow: auto;
      position: absolute;
      top: 100%;
      left: 0;
    }

    .prisma-zoom__inner__image {
      height: 100vh;
      @media screen and (max-width: ${(props) =>
          props.theme.breakpoints.md}) {
        height: auto;
      }
    }
  }
`;
