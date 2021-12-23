export const getShapesSum = (shapes = [], isLeft) => {
  return shapes.reduce((acc, el) => {
    const left = isLeft ? 50 - el.left : el.left
    return (acc += el.weight * left)
  }, 0)
}
