import React from 'react';
import PropTypes from 'prop-types';
import themed from '../../../functions/themed';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { tertiaryButtonStyle } from './TertiaryButton';

const ButtonLink = styled(Link)`
  ${tertiaryButtonStyle}
`;

const TertiaryButtonLink = (props) => <ButtonLink {...props} />;

TertiaryButtonLink.propTypes = {
  isFilled: PropTypes.bool,
};

TertiaryButtonLink.defaultProps = {
  isFilled: false,
};

export default themed(TertiaryButtonLink);
