import { removeWhiteSpaces } from 'functions/removeWhiteSpaces.func';
import groupArrayItemsWithCommonProp from '../functions/groupArrayItemsWithCommonProp.func';

const getSubjectGrade = (courseName) => {
  const courseNameWithNoSpaces = removeWhiteSpaces(courseName);

  const gradeString = 'grade';
  const gradeStringStartPos = courseNameWithNoSpaces
    .toLowerCase()
    .indexOf(gradeString);

  const subjectName = removeWhiteSpaces(
    courseNameWithNoSpaces.substring(0, gradeStringStartPos),
  );

  console.log(courseNameWithNoSpaces);

  const grade = courseNameWithNoSpaces.substring(
    gradeStringStartPos + gradeString.length,
    courseNameWithNoSpaces.length,
  );
  return {
    subjectName,
    grade,
  };
};

export default (courses = []) => {
  const groupedSubjectsObj = groupArrayItemsWithCommonProp(
    courses.map((course) => {
      const { subjectName = '', grade = '' } = getSubjectGrade(
        course.course_title,
      );
      return {
        courseId: course.course_id,
        subjectName,
        grade,
      };
    }),
    'subjectName',
  );

  return Object.keys(groupedSubjectsObj).map((subjectName) => ({
    subjectName: subjectName,
    gradesSelection: groupedSubjectsObj[subjectName]
      .map((gradeItem) => ({
        //TODO: Refactor grouping on backend
        courseId: gradeItem.courseId,
        grade: gradeItem.grade,
      }))
      .sort((a, b) => {
        return parseInt(a.grade, 10) - parseInt(b.grade, 10);
      }),
  }));
};
