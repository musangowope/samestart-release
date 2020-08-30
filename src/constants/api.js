import { hasValue } from '../functions/hasValue.func';

export default {
  getQuizByLessonId: (id = '') =>
    hasValue(id)
      ? `${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/quiz/${id}`
      : '',
  getSubjects: () =>
    `${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/subjects`,
  getSyllabus: (courseId = '') =>
    hasValue(courseId)
      ? `${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/syllabus/${courseId}`
      : '',
  getLesson: (lessonId = '') =>
    hasValue(lessonId)
      ? `${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/lesson/${lessonId}`
      : '',
  searchByAwezaTermByString: (term = '') =>
    `${process.env.REACT_APP_AWEZA_ENDPOINT}/terms/search/${term}`,
  searchByAwezaTermById: (id = '') =>
    hasValue(id)
      ? `${process.env.REACT_APP_AWEZA_ENDPOINT}/terms/${id}`
      : '',
};
