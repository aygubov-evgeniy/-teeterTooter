<template>
  <div class="play-ground">
    <falling-shapes />
    <teeter-board />
  </div>
</template>

<script>
import TeeterBoard from '~/components/TeeterBoard.vue'
import FallingShapes from '~/components/FallingShapes.vue'
import useTeeter from '~/composables/useTeeter'

export default {
  name: 'PlayGround',
  components: {
    TeeterBoard,
    FallingShapes,
  },
  setup() {
    const { startGame } = useTeeter()
    startGame()
  },
}
</script>

<style lang="scss" scoped>
.play-ground {
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  max-width: 70%;
  margin: 0 auto;
  padding-bottom: 50px;
}
</style>
