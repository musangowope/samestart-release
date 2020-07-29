import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themed from '../functions/themed';

const Gauge = ({ denominator, numerator }) => {
  const widthPercentage = (numerator / denominator) * 100;
  return (
    <div className="gauge">
      <GaugeBody className="gauge__body">
        <GaugeBodyContent
          className="gauge__body__amount"
          widthPercentage={widthPercentage}
        />
      </GaugeBody>
    </div>
  );
};

Gauge.propTypes = {
  denominator: PropTypes.number.isRequired,
  numerator: PropTypes.number.isRequired,
};

export default themed(Gauge);
const GaugeBody = styled.div`
  border: 2px solid ${(props) => props.theme.colors.tertiary};
  height: 15px;
  width: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
`;

const GaugeBodyContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.widthPercentage}%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.tertiary};
  transition: width 300ms ease-in-out;
`;

GaugeBodyContent.defaultProps = {
  widthPercentage: 0,
};
