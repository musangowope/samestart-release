import React from 'react';
import PropTypes from 'prop-types';
import themed from '../../../functions/themed';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { secondaryButtonStyle } from './SecondaryButton';

const ButtonLink = styled(Link)`
  ${secondaryButtonStyle}
`;

const SecondaryButtonLink = (props) => <ButtonLink {...props} />;

SecondaryButtonLink.propTypes = {
  isFilled: PropTypes.bool,
};

SecondaryButtonLink.defaultProps = {
  isFilled: false,
};

export default themed(SecondaryButtonLink);
