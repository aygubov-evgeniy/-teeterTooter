<template>
  <header class="header">
    <div class="user-stats">
      <div>Total weight: {{ leftShapesWeight }}</div>
      <div>
        Momentum:
        {{ momentum }}
      </div>
    </div>

    <div class="controls">
      <button @click="onToggleSimulation()">
        {{ isGamePaused ? 'Play' : 'Pause' }}
      </button>
      <button v-if="isGamePaused" @click="onToggleSimulation('auto')">
        Auto mode
      </button>
      <button @click="onResetGame()">Reset</button>
    </div>

    <div class="game-stats">
      <div>Total weight: {{ rightShapesWeight }}</div>
    </div>
  </header>
</template>

<script>
import { computed, watch } from 'vue'
import useTeeter from '~/composables/useTeeter'

export default {
  name: 'TeeterHeader',
  setup() {
    const {
      currentSpeed,
      leftShapes,
      rightShapes,
      droppingShapes,
      isGamePaused,
      onToggleSimulation,
    } = useTeeter()

    const momentum = computed(
      () =>
        droppingShapes.value[0] &&
        droppingShapes.value[0].weight * currentSpeed.value,
    )

    const leftShapesWeight = computed(() =>
      calculateShapesWeight(leftShapes.value),
    )
    const rightShapesWeight = computed(() =>
      calculateShapesWeight(rightShapes.value),
    )

    const isExtraWeight = computed(() =>
      leftShapesWeight.value - rightShapesWeight.value > 20 ||
      rightShapesWeight.value - leftShapesWeight.value > 20
        ? true
        : false,
    )

    const calculateShapesWeight = (shapes) => {
      return shapes.reduce((acc, currentShape) => {
        return (acc += currentShape.weight)
      }, 0)
    }

    const onResetGame = () => location.reload()

    watch(leftShapesWeight, () => {
      if (isExtraWeight.value) {
        alert('One side is overweight')
        onResetGame()
      }
    })

    return {
      momentum,
      currentSpeed,
      isGamePaused,
      droppingShapes,
      leftShapesWeight,
      rightShapesWeight,
      isExtraWeight,
      onResetGame,
      calculateShapesWeight,
      onToggleSimulation,
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 10px;
}
</style>
