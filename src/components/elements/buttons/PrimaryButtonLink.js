import React from 'react';
import PropTypes from 'prop-types';
import themed from '../../../functions/themed';
import styled from 'styled-components';
import { primaryButtonStyles } from './PrimaryButton';
import { Link } from '@reach/router';

const ButtonLink = styled(Link)`
  ${primaryButtonStyles}
`;

const PrimaryButtonLink = (props) => <ButtonLink {...props} />;

PrimaryButtonLink.propTypes = {
  isFilled: PropTypes.bool,
};

PrimaryButtonLink.defaultProps = {
  isFilled: false,
};

export default themed(PrimaryButtonLink);
