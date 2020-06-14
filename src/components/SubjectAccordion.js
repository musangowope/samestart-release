import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import themed from '../functions/themed';
import TextButton from './elements/buttons/TextButton';
import Accordion from './Accordion';
import DownArrowIcon from '../svgs/down-arrow-icon.svg';
import SVG from '../components/SVG';
import CircleButton from '../components/CircleButton';
import { navigate } from '@reach/router';

const SubjectContainer = styled.div`
  border: 2px solid ${(props) => props.theme.colors.tertiary};
  overflow: hidden;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SVGWrapper = styled.span`
  margin-right: 10px;
`;

const SubjectContainerHeader = styled(TextButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SubjectAccordionHeaderText = styled.span`
  color: ${(props) => props.theme.colors.primary};
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
  .ss-circle-button {
    margin-bottom: 10px;
  }
`;

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
              <SVG src={DownArrowIcon} />
            </SVGWrapper>
          </SubjectContainerHeader>
        }
      >
        <GradeSelection>
          <GradeSelectionTitle>Select a grade</GradeSelectionTitle>
          {gradesSelection.length && (
            <GradeSelectionGrades>
              {gradesSelection.map((gradeItem) => (
                <CircleButton
                  key={gradeItem.courseId}
                  buttonText={gradeItem.grade}
                  actionCallback={() =>
                    navigate(
                      `/syllabus?courseId=${gradeItem.courseId}`,
                    )
                  }
                />
              ))}
            </GradeSelectionGrades>
          )}
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
