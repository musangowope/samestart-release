import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import llmsAuthHeaders from '../functions/llmsAuthHeaders';
import groupArrayItemsWithCommonProp from '../functions/groupArrayItemsWithCommonProp.func';
import themed from '../functions/themed';

const getSubjectLangAndName = (subjectTitle) => {
  const langString = 'language';
  const langStringStartPos = subjectTitle
    .toLowerCase()
    .indexOf(langString);

  const language = subjectTitle.substring(
    langStringStartPos + langString.length + 1,
    subjectTitle.length,
  );

  const subjectName = subjectTitle.substring(
    0,
    langStringStartPos - 1,
  );
  return {
    language,
    subjectName,
  };
};

const formatLessonListLinks = (lessonListLinks) => {
  return groupArrayItemsWithCommonProp(
    lessonListLinks.map((item) => {
      const { language, subjectName } = getSubjectLangAndName(
        item.title.rendered,
      );
      return {
        lessonId: item.id,
        language,
        subjectName,
        content: item.content.rendered,
      };
    }),
    'subjectName',
  );
};

const SubjectItem = styled.div`
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const SubjectItemText = styled.span``;

const SubjectItemButton = styled.button``;

const LessonList = ({ sectionId = '' }) => {
  const [lessonListObj, setLessonListObj] = React.useState({});
  React.useEffect(() => {
    axios
      .get(
        `https://deft-cherry.myliftersite.com/wp-json/llms/v1/lessons?parent=${sectionId}`,
        {
          headers: llmsAuthHeaders,
        },
      )
      .then(({ data }) => {
        setLessonListObj({ ...formatLessonListLinks(data) });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [sectionId]);

  return (
    <div>
      {Object.keys(lessonListObj).map((subjectName, key) => (
        <SubjectItem key={key}>
          <span>{subjectName}</span>
          <button>View</button>
        </SubjectItem>
      ))}
    </div>
  );
};

LessonList.propTypes = {};
LessonList.defaultProps = {};

export default themed(LessonList);
