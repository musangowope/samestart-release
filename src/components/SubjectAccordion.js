import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import themed from '../functions/themed';
import TextButton from './elements/buttons/TransparentButton';
import Accordion from './Accordion';
import DownArrowIcon from '../svgs/down-arrow-icon.svg';
import CircleButton from '../components/CircleButton';
import { navigate } from '@reach/router';
import InlineSVG from 'react-inlinesvg';

const orderGradeSelection = (grades = []) =>
  grades.sort((a, b) => {
    return a.grade_label - b.grade_label;
  });

const SubjectAccordion = ({ subjectName, gradesSelection }) => {
  return (
    <SubjectContainer>
      <Accordion
        pressPointContent={
          <SubjectContainerHeader>
            <SubjectAccordionHeaderText>
              {subjectName}
            </SubjectAccordionHeaderText>
            <SVGWrapper>
              <InlineSVG src={DownArrowIcon} />
            </SVGWrapper>
          </SubjectContainerHeader>
        }
      >
        <GradeSelection className="grade-selection">
          <GradeSelectionTitle className="grade-selection__title">
            Select a grade
          </GradeSelectionTitle>
          {gradesSelection.length ? (
            <GradeSelectionGrades className="grade-selection__grades">
              {orderGradeSelection(gradesSelection).map(
                (gradeItem) => (
                  <CircleButton
                    key={gradeItem.course_id}
                    buttonText={gradeItem.grade_label}
                    actionCallback={() =>
                      navigate(
                        `/syllabus?courseId=${gradeItem.course_id}`,
                      )
                    }
                  />
                ),
              )}
            </GradeSelectionGrades>
          ) : null}
        </GradeSelection>
      </Accordion>
    </SubjectContainer>
  );
};

SubjectAccordion.propTypes = {
  subjectName: PropTypes.string,
  gradesSelection: PropTypes.array,
  footerContent: PropTypes.func,
  gradeSelectionTitle: PropTypes.string,
};
SubjectAccordion.defaultProps = {
  subjectName: '',
  gradesSelection: [],
  footerContent: () => false,
  gradeSelectionTitle: '',
};

export default themed(SubjectAccordion);

const SubjectContainer = styled.div`
  overflow: hidden;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.primary};
`;

const SVGWrapper = styled.span`
  margin-right: 10px;
`;

const StyledBlockLoaderWrapper = styled.div`
  .block-loader {
    border-radius: 50%;
  }
`;

const SubjectContainerHeader = styled(TextButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SubjectAccordionHeaderText = styled.span`
  color: ${(props) => props.theme.colors.white};
  padding: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const GradeSelection = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const GradeSelectionTitle = styled.div`
  color: ${(props) => props.theme.colors.white};
  text-transform: uppercase;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
`;

const GradeSelectionGrades = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  .ss-circle-button {
    margin-bottom: 10px;
  }
`;
