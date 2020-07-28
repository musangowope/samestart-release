import React from 'react';
import PropTypes from 'prop-types';
import themed from '../functions/themed';
import styled from 'styled-components';
import MathQuill, { addStyles } from 'react-mathquill';
import { removeWhiteSpaces } from '../functions/removeWhiteSpaces.func';

addStyles();

const EditableMathField = MathQuill
  ? MathQuill.EditableMathField
  : null;

const DisableLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledWrapper = styled.div`
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  align-items: center;
  position: relative;
  min-height: 36px;
  .mq-editable-field {
    height: 100%;
    border-style: none;
    border-bottom: ${(props) =>
      props.editable
        ? `2px solid ${props.theme.colors.tertiary}`
        : 'none'};
    transition: border-bottom-color 500ms ease-in-out;
    &.mq-focused {
      box-shadow: none;
      border-bottom-color: ${(props) =>
        props.theme.colors.quaternary} !important;
    }

    .mq-root-block,
    .mq-math-mode .mq-root-block {
      /* line-height: initial; */
      white-space: normal;
      word-break: break-all;
    }
    textarea {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
`;

StyledWrapper.defaultProps = {
  editable: false,
  inline: false,
};

const EquationTranslator = ({
  passedDownLatex,
  editable,
  inline,
  editorTitle,
  onChange,
}) => {
  const [latex, setLatex] = React.useState(
    removeWhiteSpaces(passedDownLatex),
  );
  React.useEffect(() => {
    onChange(latex);
  }, [latex, onChange]);
  return (
    <StyledWrapper editable={editable} inline={inline}>
      <MathQuill
        latex={latex} // Initial latex value for the input field
        onChange={(mathField) => setLatex(mathField.latex())}
      />
      {!editable && <DisableLayer />}
    </StyledWrapper>
  );
};

EquationTranslator.propTypes = {
  passedDownLatex: PropTypes.any,
  editable: PropTypes.bool,
  editorTitle: PropTypes.string,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
};
EquationTranslator.defaultProps = {
  passedDownLatex: null,
  editable: false,
  editorTitle: '',
  onChange: () => false,
  inline: false,
};

export default themed(EquationTranslator);
