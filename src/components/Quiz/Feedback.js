import React from 'react';
import PropTypes from 'prop-types';
import {
  getNegativeFeedback,
  getPositiveFeedback,
} from '../../functions/getFeedback.func';
import styled, { keyframes } from 'styled-components';
import SVG from '../SVG';
import IncorrectThembiSrc from 'svgs/thembi-incorrect.svg';
import CorrectThembiSrc from 'svgs/thembi-correct.svg';

const incorrectBob = keyframes`
  0% {
    transform: rotate(0deg);
  }

  33% {
    transform: rotate(10deg);
  }

  66% {
    transform: rotate(-10deg);
  }

  100% {
    transform: rotate(0);
  }
`;

const SvgContainer = styled.div`
  text-align: center;
  svg {
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  .thembi-success__head {
    transform-origin: center center;
    animation: ${incorrectBob} 3s ease-in-out;
  }
`;


const SuccessText = styled.div`
  color: ${props => props.theme.colors.success}
`

const Feedback = ({ isCorrect }) => {
  const feedbackText = isCorrect
    ? getPositiveFeedback()
    : getNegativeFeedback();

  if (isCorrect) {
    return (
      <React.Fragment>
        <SvgContainer>
          <SVG src={CorrectThembiSrc} />
        </SvgContainer>
        <SuccessText>{getPositiveFeedback()}</SuccessText>
      </React.Fragment>
    );
  }

  return (
    <SvgContainer>
      <SVG src={IncorrectThembiSrc} />
    </SvgContainer>
  );
};

Feedback.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
};

export default Feedback;
