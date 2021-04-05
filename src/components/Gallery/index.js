import React from 'react';
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

const Gallery = ({ galleryItems, galleryCaption }) => {
  const prismaRef = React.useRef();
  const galleryContainerRef = React.useRef();

  const isMobileVpWidth = useIsMobile();

  const screenOrientation = useOrientationChange();

  const toggle_accordion = 'toggle_accordion';
  const open_gallery_modal = 'open_gallery_modal';
  const close_gallery_modal = 'close_gallery_modal';
  const increment_slide_number = 'increment_slide_number';
  const decrement_slide_number = 'decrement_slide_number';
  const set_zoom = 'set_zoom';

  const accordianRef = React.useRef();
  const [galleryState, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case toggle_accordion:
          return {
            ...state,
            readyForAccordionLogic: true,
            isAccordionOpen: !state.isAccordionOpen,
          };
        case open_gallery_modal:
          return {
            ...state,
            isModalOpen: true,
            currentSlideNumber: action.payload.currentSlideNumber,
          };

        case decrement_slide_number:
          return {
            ...state,
            currentSlideNumber: state.currentSlideNumber - 1,
          };

        case increment_slide_number:
          return {
            ...state,
            currentSlideNumber: state.currentSlideNumber + 1,
          };

        case set_zoom:
          return {
            ...state,
            zoom: action.payload.zoom,
          };
        case close_gallery_modal:
          return {
            ...state,
            isModalOpen: false,
            zoom: 1,
          };
        default:
          return state;
      }
    },
    {
      isAccordionOpen: false,
      isModalOpen: false,
      currentSlideNumber: 0,
      readyForAccordionLogic: false,
      zoom: 1,
    },
  );

  React.useEffect(() => {
    if (accordianRef && galleryState.readyForAccordionLogic) {
      if (galleryState.isAccordionOpen) {
        accordianRef.current.open();
      } else {
        accordianRef.current.close();
      }
    }
  }, [
    galleryState.isAccordionOpen,
    galleryState.readyForAccordionLogic,
  ]);

  const handleToggleBtnClick = () =>
    dispatch({
      type: toggle_accordion,
    });

  const handleCloseGalleryModal = () => {
    if (galleryState.isModalOpen) {
      if (prismaRef) {
        prismaRef.current.reset();
      }
      dispatch({
        type: close_gallery_modal,
      });
      closeFullScreen();

      window.setTimeout(() => {
        scrollToElement(galleryContainerRef.current, 0, 'auto');
      }, 250);
    }
  };

  const handleOpenGallery = (nextSlideNumber = 0) => {
    if (isMobileVpWidth) {
      requestFullScreen();
    }

    dispatch({
      type: open_gallery_modal,
      payload: {
        currentSlideNumber: nextSlideNumber,
      },
    });
  };

  const handleIncrementSlideNumber = () => {
    if (galleryState.currentSlideNumber < galleryItems.length - 1) {
      handleResetZoom();
      dispatch({
        type: increment_slide_number,
      });
    }
  };

  const handleDecrementSlideNumber = () => {
    if (galleryState.currentSlideNumber > 0) {
      handleResetZoom();
      dispatch({
        type: decrement_slide_number,
      });
    }
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

  const onZoomChange = (zoom = 1) =>
    dispatch({
      type: set_zoom,
      payload: {
        zoom,
      },
    });

  const handleResetZoom = () => {
    if (prismaRef) {
      prismaRef.current.reset();
    }
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
            isAccordionOpen={galleryState.isAccordionOpen}
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
        isOpen={galleryState.isModalOpen}
        closeAction={handleCloseGalleryModal}
        extraModalContentStyles={css`
          max-width: 100%;
          overflow: hidden;
        `}
      >
        <ZoomWrapper isMobileVpWidth={isMobileVpWidth}>
          <PrismaZoom
            onZoomChange={onZoomChange}
            className="prisma-zoom"
            ref={prismaRef}
          >
            <div className="prisma-zoom__inner">
              <img
                className="prisma-zoom__inner__image"
                src={
                  galleryItems[galleryState.currentSlideNumber].imgSrc
                }
                alt={galleryCaption}
              />
            </div>
          </PrismaZoom>
        </ZoomWrapper>

        <StyledZoomControllerWrapper
          screenOrientation={screenOrientation}
        >
          <ZoomController
            zoomInFn={handleGalleryZoomIn}
            zoomOutFn={handleGalleryZoomOut}
            closeFn={handleCloseGalleryModal}
            resetZoomFn={handleResetZoom}
            currentZoomPercentage={`${
              parseInt(galleryState.zoom) * 100
            }%`}
          />
        </StyledZoomControllerWrapper>

        <StyledControllerWrapper
          screenOrientation={screenOrientation}
        >
          <SlideController
            currentSlideNumber={galleryState.currentSlideNumber}
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
  galleryItems: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      slideCaption: PropTypes.string,
    }),
  ),
};

Gallery.defaultProps = {
  galleryCaption: '',
  galleryItems: [],
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
};

const ZoomWrapper = styled.div`
  height: 100%;
  .prisma-zoom {
    height: 100%;
  }

  .prisma-zoom__inner {
    @media screen and (max-width: ${(props) =>
        props.theme.breakpoints.sm}) {
      height: 100%;
      transform: rotate(-90deg);
      transform-origin: left top;
      width: 100vh;
      overflow-x: scroll;
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
