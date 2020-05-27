import React from 'react';
import axios from 'axios';
import LessonListLinks from './LessonList';

const SectionsMapper = ({ url }) => {
  const [sections, setSections] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        console.log(data);
        setSections([...data]);
      })
      .catch((e) => console.log(e));
  }, [url]);

  return sections.map((section) => (
    <div key={section.id}>
      {section.title.rendered}
      <LessonListLinks sectionId={section.id} />
    </div>
  ));
};

export default SectionsMapper;
