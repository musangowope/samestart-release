export default (data) =>
  data.map((item) => ({
    title: item.title.rendered,
    sectionId: item.id,
  }));
