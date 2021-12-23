<template>
  <div>
    <div class="board" :style="boardStyling">
      <teeter-shape
        v-for="shape in leftShapes"
        :key="shape.id"
        :options="shape"
        is-on-board
      />

      <teeter-shape
        v-for="shape in rightShapes"
        :key="shape.id"
        :options="shape"
        is-on-board
        place-randomly
      />
    </div>

    <div class="bottom-triangle" />
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import TeeterShape from './TeeterShape.vue'
import useTeeter from '~/composables/useTeeter'

export default {
  name: 'TeeterBoard',
  components: {
    TeeterShape,
  },
  setup() {
    const { leftShapes, rightShapes, boardAngle, createShape, isBoardValid } =
      useTeeter()

    const boardStyling = computed(() => {
      return {
        transform: `rotate(${boardAngle.value / 2}deg)`,
        transition: `${Math.abs(boardAngle.value / 2) * 10}ms ease-in`,
      }
    })

    const leftMore = computed(
      () => leftShapes.value.length === rightShapes.value.length,
    )

    watch(leftMore, (newVal) => {
      if (newVal && isBoardValid.value) {
        // create new shape for the right side
        createShape(true)
      }
    })

    return {
      boardAngle,
      leftShapes,
      rightShapes,
      boardStyling,
    }
  },
}
</script>

<style lang="scss" scoped>
.board {
  position: relative;
  width: 100%;
  height: 10px;
  background-color: #0e24a0;
}

.bottom-triangle {
  width: 0;
  height: 0;
  margin: 0 auto;
  border-right: 3rem solid transparent;
  border-bottom: 8rem solid #921919;
  border-left: 3rem solid transparent;
}
</style>
