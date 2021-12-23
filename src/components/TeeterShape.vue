<template>
  <div
    :id="`shape-${options.id}`"
    ref="shape"
    class="shape"
    :class="shapeClass"
  >
    <div class="weight">{{ options.weight }}kg</div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { SQUARE, TRIANGLE, CIRCLE } from '~/constants/shapes'

export default {
  name: 'TeeterShape',
  props: {
    placeRandomly: {
      type: Boolean,
      default: false,
    },
    isOnBoard: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const shape = ref(null)

    const shapeClass = computed(() => {
      return {
        square: props.options.type === SQUARE,
        triangle: props.options.type === TRIANGLE,
        circle: props.options.type === CIRCLE,
      }
    })

    const setScaleAndColor = () => {
      const { color, scale, type } = props.options
      const { style } = shape.value

      style.transform = `scale(${scale})`

      if (type === TRIANGLE) {
        style.borderBottomColor = color
      } else {
        style.backgroundColor = color
      }
      if (props.isOnBoard) {
        style.transform += ' translateY(-100%)'
      }
    }

    const setShapePosition = (left) => {
      const { width } = shape.value.getBoundingClientRect()
      const start = props.placeRandomly ? 60 : 0

      shape.value.style.left =
        props.placeRandomly && left > 25
          ? `calc(${start + left}% - ${width}px)`
          : `${start + left}%`
    }

    watch(props.options, ({ left }) => setShapePosition(left))

    onMounted(() => {
      setShapePosition(props.options.left)
      setScaleAndColor()
    })

    return {
      shape,
      shapeClass,
    }
  },
}
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: top left;

  .weight {
    color: #fff;
    font-weight: 500;
    font-size: 10px;
  }
}

.square,
.circle {
  width: 3rem;
  height: 3rem;
}

.circle {
  border-radius: 50%;
}

.triangle {
  width: 0;
  height: 0;
  border-right: 1.5rem solid transparent;
  border-bottom: 2rem solid;
  border-left: 1.5rem solid transparent;

  .weight {
    position: absolute;
    top: calc(100% + 1rem);
    width: 4.5rem;
    text-align: center;
  }
}
</style>
