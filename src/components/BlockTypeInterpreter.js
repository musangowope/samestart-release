import React from 'react';
import PropTypes from 'prop-types';
import EquationTranslator from './EquationTranslator';
import { createMarkup } from '../functions/createMarkup.func';
import styled from 'styled-components';
import themed from '../functions/themed';
import EllipsisIconSrc from 'svgs/ellipsis.svg';
import InlineSVG from 'react-inlinesvg';
import GalleryController from './GalleryController';

const getEquationElement = (html = '') => {
  const katexNode = document.createElement('div');
  katexNode.innerHTML = html;
  const katex = katexNode.querySelector(
    '.wp-block-katex-display-block',
  ).innerHTML;
  return <EquationTranslator passedDownLatex={katex} />;
};

const getGalleryComponent = (html = '', blockKey) => {
  const domNode = document.createElement('div');
  domNode.innerHTML = html;
  const galleryCaptionElement = domNode.querySelector(
    '.blocks-gallery-caption',
  );
  const galleryCaption = galleryCaptionElement
    ? galleryCaptionElement.innerText
    : '';
  const galleryNodeList = [
    ...domNode.querySelectorAll('.blocks-gallery-item'),
  ];
  if (galleryNodeList.length) {
    const galleryItems = galleryNodeList.map((item) => {
      const imgElement = item.querySelector('figure img');
      const imgSrc = imgElement.src;
      const slideCaptionElement = item.querySelector(
        '.blocks-gallery-item__caption',
      );
      const slideCaption = slideCaptionElement
        ? slideCaptionElement.innerHTML
        : '';
      return {
        imgSrc,
        slideCaption,
      };
    });
    return (
      <GalleryController
        blockKey={blockKey}
        galleryItems={galleryItems}
        galleryCaption={galleryCaption}
      />
    );
  }
  return <div />;
};

const BlockTypeInterpreter = ({
  blockName,
  innerHTML,
  isActive,
  translatable,
  blockKey,
}) => {
  const getBlockContent = () => {
    switch (blockName) {
      case 'katex/display-block':
        return getEquationElement(innerHTML, blockKey);
      case 'core/gallery':
        return getGalleryComponent(innerHTML, blockKey);
      default: {
        return (
          <BlockContent
            translatable={translatable}
            isActive={isActive}
            dangerouslySetInnerHTML={createMarkup(innerHTML)}
            role="button"
            tabIndex={1}
          />
        );
      }
    }
  };

  return (
    <BlockContentContainer>
      {getBlockContent()}
      {translatable && (
        <TranslatableIconContainer>
          <InlineSVG src={EllipsisIconSrc} />
        </TranslatableIconContainer>
      )}
    </BlockContentContainer>
  );
};

BlockTypeInterpreter.propTypes = {
  blockKey: PropTypes.string,
  blockName: PropTypes.string,
  innerBlocks: PropTypes.array,
  innerHTML: PropTypes.any,
  innerContent: PropTypes.any,
  isActive: PropTypes.bool,
  translatable: PropTypes.bool,
};
BlockTypeInterpreter.defaultProps = {
  blockKey: '',
  blockName: '',
  innerBlocks: [],
  innerHTML: '',
  isActive: false,
  translatable: false,
};

export default themed(BlockTypeInterpreter);

const TranslatableIconContainer = styled.div`
  svg {
    width: 35px;
    height: auto;
    display: flex;
  }
`;

const BlockContentContainer = styled.div``;

const BlockContent = styled.div`
  transition: 500ms ease-in-out;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-bottom: 10px;
  }
  h1 {
    font-size: ${(props) => props.theme.fontSizes[6]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes[5]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizes[4]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  h4 {
    font-size: ${(props) => props.theme.fontSizes[3]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  h5 {
    font-size: ${(props) => props.theme.fontSizes[2]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  outline: none !important;

  color: ${(props) =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.base};
`;
