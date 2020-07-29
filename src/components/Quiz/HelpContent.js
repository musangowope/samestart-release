import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import themed from '../../functions/themed';
import { createMarkup } from '../../functions/createMarkup.func';

const StyledHelpContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 20px;
  margin-bottom: 20px;
`;

const StyledHelpTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes[3]};
  //font-weight: bold;
  color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
  margin-bottom: 15px;
`;

const StyledHelpBody = styled.div`
  color: white;
`;

const HelpContent = ({ content, title }) => {
  return (
    <StyledHelpContainer>
      <StyledHelpTitle>{title}</StyledHelpTitle>
      <StyledHelpBody
        dangerouslySetInnerHTML={createMarkup(content)}
      />
    </StyledHelpContainer>
  );
};

HelpContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
};
HelpContent.defaultProps = {
  title: '',
  content: null,
};

export default themed(HelpContent);
