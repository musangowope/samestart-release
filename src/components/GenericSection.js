import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavHeight } from './SSNavbar';
import Loader from './Loader';
import AnimationContainer from './AnimationContainer';

const GenericSectTitle = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 40px;
  padding: 10px 10px 10px 20px;
  border-bottom-right-radius: 40px;
  border-top-left-radius: 40px;
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

const GenericContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: ${NavHeight / 2}px;

  .animate__animated {
    height: 100%;
  }
`;

const GenericContainer = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
`;

const LoaderContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

const GenericSection = ({ children, title, contentIsLoading }) => {
  return (
    <GenericContent className="generic-section">
      {contentIsLoading ? (
        <GenericContainer className="generic-section__container">
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        </GenericContainer>
      ) : (
        <AnimationContainer animatedClassName="animate__fadeIn">
          <GenericContainer className="generic-section__container">
            <GenericSectTitle className="generic-section__container__title">
              {title}
            </GenericSectTitle>
            <GenericContent className="generic-section__container__content">
              {children}
            </GenericContent>
          </GenericContainer>
        </AnimationContainer>
      )}
    </GenericContent>
  );
};

GenericSection.propTypes = {
  contentIsLoading: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
};
GenericSection.defaultProps = {
  contentIsLoading: false,
  children: null,
  title: '',
};

export default GenericSection;
