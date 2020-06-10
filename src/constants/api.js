export default {
  getSubjects: () =>
    `${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/courses`,
  getSyllabus: (courseId = '') =>
    `${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/syllabus/${courseId}`,
  getLesson: (lessonId = '') =>
    `${process.env.REACT_APP_WP_ENDPOINT}/wp-json/samestart-lms/v1/lesson/${lessonId}`,
  searchByAwezaTermByString: (term = '') =>
    `${process.env.REACT_APP_AWEZA_ENDPOINT}/terms/search/${term}`,
  searchByAwezaTermById: (id = '') =>
    `${process.env.REACT_APP_AWEZA_ENDPOINT}/terms/${id}`,
};
