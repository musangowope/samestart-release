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
import themed from '../../functions/themed';
import InlineSVG from 'react-inlinesvg';

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
  margin-bottom: 20px;
  svg {
    max-width: 150px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: auto;
  }

  .thembi-success__head {
    transform-origin: center center;
    animation: ${incorrectBob} 3s ease-in-out;
  }
`;

const FeedbackTitle = styled.div`
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const SuccessText = styled.div`
  color: ${(props) => props.theme.colors.tertiary};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Feedback = () => (
  <React.Fragment>
    <SvgContainer>
      <SVG src={CorrectThembiSrc} />
    </SvgContainer>
    <FeedbackTitle>Correct!</FeedbackTitle>
    <SuccessText>{getPositiveFeedback()}</SuccessText>
  </React.Fragment>
);

export default themed(Feedback);
