import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Gallery from './Gallery';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

const GalleryController = ({
  galleryCaption,
  galleryItems,
  blockKey,
}) => {
  const location = useLocation();
  const { activeBlockKey: activeBlockKeyParam = '' } =
    queryString.parse(location.search);
  const [activeSlideNumber, setActiveSlideNumber] = useState(0);

  const [activeBlockKey, setActiveBlockKey] = React.useState(
    activeBlockKeyParam,
  );

  React.useEffect(() => {
    setActiveBlockKey(activeBlockKeyParam);
  }, [activeBlockKeyParam]);

  const onNextSlideClick = () => {
    if (activeSlideNumber < galleryItems.length - 1) {
      setActiveSlideNumber((prevState) => prevState + 1);
    }
  };
  const onPrevSlide = () => {
    if (activeSlideNumber > 0) {
      setActiveSlideNumber((prevState) => prevState - 1);
    }
  };

  const onOpenButtonClick = () => {
    setActiveSlideNumber(0);
    const url = new URL(location.href);
    url.searchParams.set('activeBlockKey', blockKey);
    navigate(url.href);
  };

  const onCloseButtonClick = () => {
    setActiveSlideNumber(0);
    const url = new URL(location.href);
    url.searchParams.delete('activeBlockKey');
    navigate(url.href);
  };

  const isGalleryModalOpen = activeBlockKey === blockKey;

  return (
    <Gallery
      galleryCaption={galleryCaption}
      galleryItems={galleryItems}
      activeSlideNumber={activeSlideNumber}
      isGalleryModalOpen={isGalleryModalOpen}
      onNextSlideClick={onNextSlideClick}
      onPrevSlideClick={onPrevSlide}
      onOpenButtonClick={onOpenButtonClick}
      onCloseClick={onCloseButtonClick}
    />
  );
};

GalleryController.propTypes = {
  galleryCaption: PropTypes.string,
  galleryItems: PropTypes.array,
  blockKey: PropTypes.string,
};

GalleryController.defaultProps = {
  galleryCaption: '',
  galleryItems: [],
  blockKey: '',
};

export default GalleryController;
