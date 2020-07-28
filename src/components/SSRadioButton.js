import React from 'react';
import PropTypes from 'prop-types';

const SSRadioButton = ({
  value,
  name,
  onChange,
  hasError,
  renderContent,
}) => {
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    onChange(value);
  };

  return (
    <label>
      <div className={`ss-radio-button${hasError ? '--error' : ''}`}>
        <input
          type="radio"
          value={value}
          name={name}
          onChange={handleChange}
        />
        <div className="ss-radio-button__border" />
        <div className="ss-radio-button__background" />
        <div className="ss-radio-button__text">{renderContent()}</div>
        <div className="ss-radio-button__circle">
          <div className="ss-radio-button__circle__inner" />
        </div>
      </div>
    </label>
  );
};

SSRadioButton.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
  renderContent: PropTypes.func,
};
SSRadioButton.defaultProps = {
  value: '',
  name: '',
  hasError: false,
  onChange: () => false,
  children: null,
  renderContent: () => false,
};

export default SSRadioButton;
