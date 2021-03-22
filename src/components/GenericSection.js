import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from './Loader';
import AnimationContainer from './AnimationContainer';
import { NavMenuHeight } from './SSNavbar';

const GenericSection = ({ children, title, contentIsLoading }) => {
  return (
    <StyledGenericContent className="generic-section">
      {contentIsLoading ? (
        <StyledGenericContainer className="generic-section__container">
          <StyledLoaderContainer>
            <Loader />
          </StyledLoaderContainer>
        </StyledGenericContainer>
      ) : (
        <AnimationContainer animatedClassName="animate__fadeIn">
          <StyledGenericContainer className="generic-section__container">
            {title && (
              <StyledGenericSectTitle className="generic-section__container__title">
                {title}
              </StyledGenericSectTitle>
            )}
            <StyledGenericContent className="generic-section__container__content">
              {children}
            </StyledGenericContent>
          </StyledGenericContainer>
        </AnimationContainer>
      )}
    </StyledGenericContent>
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

const StyledGenericSectTitle = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 40px;
  padding: 10px 10px 10px 20px;
  border-bottom-right-radius: 40px;
  border-top-left-radius: 40px;
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

const StyledGenericContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: ${() => `${NavMenuHeight}px`};
`;

const StyledGenericContainer = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
`;

const StyledLoaderContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;
