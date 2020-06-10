import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import themed from '../functions/themed';
import { hasValue } from '../functions/hasValue.func';
import ErrorMessage from './ErrorMessage';

const DropSelectContainer = styled.div`
  .ss-drop-select {
  }

  .ss-drop-select__control,
  .ss-drop-select__control--menu-is-open,
  .ss-drop-select__control--is-focused,
  .ss-drop-select:hover {
    outline: none;
    border: none;
    box-shadow: none;
  }

  .ss-drop-select__control {
    border-bottom: 2px solid
      ${(props) =>
        props.hasError
          ? props.theme.colors.primary
          : props.theme.colors.tertiary};
    border-radius: 0;

    &:hover {
      border-bottom: 2px solid
        ${(props) => props.theme.colors.quaternary};
    }
  }
`;

DropSelectContainer.propTypes = {
  hasError: PropTypes.bool,
};

DropSelectContainer.defaultProps = {
  hasError: false,
};

const SSDropSelect = ({
  title,
  errorMessage,
  name,
  id,
  onMenuClose,
  defaultValue,
  ...restProps
}) => {
  const getDefaultValue = () => {
    if (defaultValue && hasValue(defaultValue.value)) {
      return {
        label: defaultValue.label,
        value: defaultValue.value,
      };
    }
    return null;
  };

  return (
    <DropSelectContainer hasError={hasValue(errorMessage)}>
      <label htmlFor={id}>{title}</label>
      <Select
        {...restProps}
        id={id}
        name={name}
        defaultValue={getDefaultValue()}
        className="ss-drop-select"
        classNamePrefix="ss-drop-select"
        onMenuClose={(e) => onMenuClose(e)}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </DropSelectContainer>
  );
};

SSDropSelect.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  errorMessage: PropTypes.string,
  onMenuClose: PropTypes.func,
  defaultValue: PropTypes.object,
};

SSDropSelect.defaultProps = {
  title: '',
  errorMessage: '',
  name: '',
  id: '',
  onMenuClose: () => false,
  defaultValue: null,
};

export default themed(SSDropSelect);
