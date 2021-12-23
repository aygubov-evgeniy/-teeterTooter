function* getID() {
  let i = 1
  while (true) yield (i += 1)
}

const randomID = {
  getRandomID: getID(),
}

export default randomID
