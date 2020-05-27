import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import { HeadingTwo } from './elements/typography';
import styled from 'styled-components';

const GenericTitleContainer = styled.h2`
  margin-bottom: 20px;
`;
const GenericContent = styled.div``;

const GenericSection = ({ children, title }) => {
  return (
    <Container>
      <GenericTitleContainer>
        <HeadingTwo>{title}</HeadingTwo>
      </GenericTitleContainer>
      <GenericContent>{children}</GenericContent>
    </Container>
  );
};

GenericSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
GenericSection.defaultProps = {
  children: null,
  title: '',
};

export default GenericSection;
