export const getFragTypesObj = () => ({
  text: {
    label: "Paragraph",
    value: "text",
  },
  image: {
    label: "Image",
    value: "image",
  },
  latex: {
    label: "Equation",
    value: "latex",
  },
})


export const getFragTypesArray = () => {
  const obj = getFragTypesObj()
  return Object.keys(obj).map(propName => ({
    label: obj[propName].label,
    value: obj[propName].value,
  }))
}
