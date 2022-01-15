import React from 'react';
import GenericSection from '../components/GenericSection';
import ShapedBackground from '../components/ShapedBackground';
import themed from '../functions/themed';
import MultilingualEduSrc from '../svgs/multilingual-icon.svg';
import ActionCardLink from '../components/ActionCardLink';

const EntranceView = () => {
  return (
    <ShapedBackground>
      <GenericSection title="Begin your journey">
        <ActionCardLink
          to={`/subjects`}
          cardTitle="Learn"
          cardBody="Kickstart your schooling career with some great learning resources"
          svgSrc={MultilingualEduSrc}
        />
      </GenericSection>
    </ShapedBackground>
  );
};

EntranceView.propTypes = {};
EntranceView.defaultProps = {};

export default themed(EntranceView);
