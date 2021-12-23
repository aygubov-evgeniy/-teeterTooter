<template>
  <teeter-header />
  <play-ground />
</template>

<script>
import TeeterHeader from './components/TeeterHeader.vue'
import PlayGround from '~/components/PlayGround.vue'

export default {
  name: 'AppRoot',
  components: {
    TeeterHeader,
    PlayGround,
  },
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: #2c3e50;
}
</style>
