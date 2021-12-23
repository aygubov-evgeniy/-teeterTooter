<template>
  <div class="shapes">
    <teeter-shape
      v-for="shape in droppingShapes"
      :key="shape.id"
      :options="shape"
    />
  </div>
</template>

<script>
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import TeeterShape from './TeeterShape.vue'
import useTeeter from '~/composables/useTeeter'

export default {
  name: 'FallingShapes',
  components: {
    TeeterShape,
  },
  setup() {
    const {
      droppingShapes,
      mode,
      isGamePaused,
      boardAngle,
      isBoardValid,
      moveDroppingShape,
      addLeftShape,
      updateVelocity,
      createShape,
      currentSpeed,
    } = useTeeter()

    let interval
    const shapeBottomLimit = ref()

    const currentFallingShape = computed(() => {
      const { id } = droppingShapes.value[0]
      return document.getElementById(`shape-${id}`)
    })

    watch(
      () => isGamePaused.value,
      (newVal) => {
        if (newVal) {
          clearInterval(interval)
        } else {
          getShapeBottomLimit()
          animateShape()
        }
      },
    )

    const moveShape = async ({ keyCode }) => {
      if (mode.value === 'manual') {
        const isArrowPressed = [37, 39].includes(keyCode)

        if (isGamePaused.value || !isArrowPressed) return

        const shapeWidth = document
          .getElementById(currentFallingShape.value.id)
          .getBoundingClientRect().width
        const areaWidth = document
          .querySelector('.shapes')
          .getBoundingClientRect().width

        moveDroppingShape({
          moveLeft: keyCode === 37,
          width: (shapeWidth / areaWidth) * 100,
        })
      }

      await nextTick()
      getShapeBottomLimit()
    }

    const animateShape = () => {
      if (isGamePaused.value) return
      interval = setInterval(() => {
        if (droppingShapes.value[0].top >= shapeBottomLimit.value) {
          const droppedShape = droppingShapes.value.shift()

          clearInterval(interval)

          addLeftShape(droppedShape)
          updateVelocity()
          createShape()
          animateShape()
        } else {
          droppingShapes.value[0].top += 1
          document.getElementById(
            currentFallingShape.value.id,
          ).style.top = `${droppingShapes.value[0].top}px`
        }
      }, currentSpeed.value)
    }

    const getShapeBottomLimit = () => {
      const boardBounds = document
        .querySelector('.board')
        .getBoundingClientRect()
      const panelBounds = document
        .querySelector('.header')
        .getBoundingClientRect()

      const shapeBounds = currentFallingShape.value.getBoundingClientRect()
      const totterCathet = boardBounds.bottom - boardBounds.top - 10
      const similarCathet = (droppingShapes.value[0].left * totterCathet) / 100

      shapeBottomLimit.value =
        boardAngle.value >= 0
          ? boardBounds.top +
            similarCathet -
            shapeBounds.height -
            panelBounds.height
          : boardBounds.bottom -
            similarCathet -
            shapeBounds.height -
            panelBounds.height
    }

    const handleBoardTransitionEnd = () => {
      if (isGamePaused.value) return

      if (isBoardValid.value) {
        getShapeBottomLimit()
      } else {
        alert('You lose, try again')
        location.reload()
      }
    }

    onMounted(() => {
      const boardEl = document.querySelector('.play-ground')
      boardEl.addEventListener('transitionend', handleBoardTransitionEnd)
      window.addEventListener('keydown', moveShape)
      animateShape()
    })

    return {
      interval,
      droppingShapes,
      currentFallingShape,
    }
  },
}
</script>

<style lang="scss" scoped>
.shapes {
  position: relative;
  flex: 1 1 50%;
}
</style>
