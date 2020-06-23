import React from 'react';
import PropTypes from 'prop-types';
import { HeadingTwo } from './elements/typography';
import styled from 'styled-components';
import { NavHeight } from './SSNavbar';

const GenericSectTitle = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 40px;
  padding: 10px 10px 10px 40px;
  border-bottom-right-radius: 40px;
  border-top-left-radius: 40px;
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

const GenericContent = styled.div`
  margin-bottom: ${(props) =>
    props.hasMobileFooter ? `${NavHeight}px` : 0};
  flex-grow: 1;
`;

const GenericContainer = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
`;

const GenericSection = ({
  children,
  title,
  hasMobileFooter,
  contentIsLoading,
}) => {
  return (
    <GenericContent
      className="generic-section"
      hasMobileFooter={hasMobileFooter}
    >
      {contentIsLoading ? (
        <GenericContainer className="generic-section__container">
          LOADING
        </GenericContainer>
      ) : (
        <GenericContainer className="generic-section__container">
          <GenericSectTitle className="generic-section__container__title">
            {title}
          </GenericSectTitle>
          <GenericContent className="generic-section__container__content">
            {children}
          </GenericContent>
        </GenericContainer>
      )}
    </GenericContent>
  );
};

GenericSection.propTypes = {
  contentIsLoading: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  hasMobileFooter: PropTypes.bool,
};
GenericSection.defaultProps = {
  contentIsLoading: false,
  children: null,
  title: '',
  hasMobileFooter: false,
};

export default GenericSection;
