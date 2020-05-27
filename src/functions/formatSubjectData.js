import removeWhiteSpaces from '../functions/removeWhiteSpaces.func';
import groupArrayItemsWithCommonProp from '../functions/groupArrayItemsWithCommonProp.func';

const getSubjectGrade = (courseName) => {
  const gradeString = 'grade';
  const gradeStringStartPos = courseName.toLowerCase().indexOf(gradeString);

  const subjectName = removeWhiteSpaces(
    courseName.substring(0, gradeStringStartPos),
  );

  const grade = courseName[courseName.length - 1];
  return {
    subjectName,
    grade,
  };
};

export default (courses = []) => {
  const groupedSubjectsObj = groupArrayItemsWithCommonProp(
    courses.map((course) => {
      const { subjectName = '', grade = '' } = getSubjectGrade(
        course.title.rendered,
      );
      return {
        courseId: course.id,
        subjectName,
        grade,
      };
    }),
    'subjectName',
  );

  return Object.keys(groupedSubjectsObj).map((subjectName) => ({
    subjectName: subjectName,
    gradesSelection: groupedSubjectsObj[subjectName].map((gradeItem) => ({
      courseId: gradeItem.courseId,
      grade: gradeItem.grade,
    })),
  }));
};
