import { getRandomIntBetweenRange } from './getRandomIntBetweenRange.func';

export const correctAnsFeedbackMsgs = [
  `Well done! you are a genius`,
  `The Force is strong with you!`,
  `Smarty pants!`,
  `Definitely, the next Einstein!`,
];

export const incorrectAnsFeedbackMsgs = [
  `Don't give up!`,
  `We all make mistakes. What's important is that we learn from them`,
  `Keep fighting! We can do this!`,
  `The war isn't over yet!`,
];

export const getPositiveFeedback = () =>
  correctAnsFeedbackMsgs[
    getRandomIntBetweenRange(0, correctAnsFeedbackMsgs.length - 1)
  ];

export const getNegativeFeedback = () =>
  incorrectAnsFeedbackMsgs[
    getRandomIntBetweenRange(0, incorrectAnsFeedbackMsgs.length - 1)
  ];
