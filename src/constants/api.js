import { hasValue } from '../functions/hasValue.func';

export default {
  getQuizByLessonId: (id = '') => {
    // ${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/quiz/${id}
    return hasValue(id) ? `/sample-data/quiz-${id}.json` : '';
  },
  getSubjects: () => {
    // `${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/subjects`
    return '/sample-data/subjects.json';
  },

  getSyllabus: (courseId = '') => {
    // `${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/syllabus/${courseId}`
    return '/sample-data/syllabus.json';
  },
  getLesson: (lessonId = '') => {
    // ${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/lesson/${lessonId}`
    return hasValue(lessonId)
      ? `/sample-data/lesson-${lessonId}.json`
      : '';
  },
};
