import { ref, computed } from 'vue'
import { generateRandomNumber } from '~/utils/generateRandomNumber'
import { generateRandomColor } from '~/utils/generateRandomColor'
import randomID from '~/utils/getRandomID'
import { getShapesSum } from '~/utils/getShapesSum'

const leftShapes = ref([])
const rightShapes = ref([])
const droppingShapes = ref([])
const isGamePaused = ref(true)
const currentSpeed = ref(10)
const mode = ref('manual')

const boardAngle = computed(() => {
  let angle = 0
  const diff = Math.abs(leftShapesAmount.value - rightShapesAmount.value)
  angle =
    leftShapesAmount.value > rightShapesAmount.value
      ? (diff / leftShapesAmount.value) * -50
      : (diff / rightShapesAmount.value) * 50
  return angle
})

const isBoardValid = computed(
  () => boardAngle.value > -30 && boardAngle.value < 30,
)
const leftShapesAmount = computed(() => getShapesSum(leftShapes.value, true))
const rightShapesAmount = computed(() => getShapesSum(rightShapes.value, false))

const clearShapes = () => {
  leftShapes.value = []
  rightShapes.value = []
  droppingShapes.value = []
}

const onToggleSimulation = (val = 'manual') => {
  isGamePaused.value = !isGamePaused.value
  mode.value = val
}

const addLeftShape = (shape) => leftShapes.value.push(shape)

const createShape = (right = false) => {
  const weight = generateRandomNumber(1, 10 - 1)
  const type = generateRandomNumber(1, 2)
  const left = generateRandomNumber(0, 40)
  const color = generateRandomColor()
  const top = 0
  const scale = 1 + 0.08 * (weight - 1)
  const id = randomID.getRandomID.next().value
  const shape = {
    id,
    color,
    type,
    weight,
    top,
    left,
    scale,
  }

  if (right) {
    rightShapes.value.push(shape)
  } else {
    droppingShapes.value.push(shape)
  }
}

const moveDroppingShape = ({ moveLeft, width }) => {
  const shape = droppingShapes.value[0]
  const canMoveLeft = shape.left - 1 >= 0
  const canMoveRight = shape.left + width + 1 <= 45

  if (moveLeft && canMoveLeft) {
    droppingShapes.value[0].left -= 1
  } else if (canMoveRight) {
    droppingShapes.value[0].left += 1
  }
}

const updateVelocity = (reset = false) => {
  if (reset) {
    currentSpeed.value = 10
  } else if (currentSpeed.value > 0) {
    currentSpeed.value -= 1
  }
}

const startGame = () => {
  clearShapes()
  updateVelocity(true)
  createShape()
  createShape()
  createShape(true)
}

const useTeeter = () => ({
  leftShapes,
  rightShapes,
  droppingShapes,
  isGamePaused,
  currentSpeed,
  mode,
  boardAngle,
  isBoardValid,
  leftShapesAmount,
  clearShapes,
  updateVelocity,
  addLeftShape,
  createShape,
  moveDroppingShape,
  startGame,
  onToggleSimulation,
})

export default useTeeter
