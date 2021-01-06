import React from 'react';
import GenericSection from '../components/GenericSection';
import ShapedBackground from '../components/ShapedBackground';
import themed from '../functions/themed';
import CareerGuidanceSrc from '../svgs/career-guidance.svg';
import MultilingualEduSrc from '../svgs/multilingual-icon.svg';
import ActionCardLink from '../components/ActionCardLink';
import serviceConstants from '../constants/serviceConstants';

const EntranceView = () => {
  return (
    <ShapedBackground>
      <GenericSection title="Begin your journey">
        <div className="mb-5">
          <ActionCardLink
            to={`/service?name=${serviceConstants.YENZA_SERVICE}`}
            cardTitle="Career"
            cardBody="Smart Career Technology will put you on a path towards
              career success."
            svgSrc={CareerGuidanceSrc}
          />
        </div>
        <ActionCardLink
          to={`/subjects`}
          cardTitle="Learn"
          cardBody="Coming Soon"
          svgSrc={MultilingualEduSrc}
          disabled={true}
        />
      </GenericSection>
    </ShapedBackground>
  );
};

EntranceView.propTypes = {};
EntranceView.defaultProps = {};

export default themed(EntranceView);
