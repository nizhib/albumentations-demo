<template>
  <div class="field has-addons">
    <div class="control">
      <button @click="decrement" class="button"
              :disabled="value - step < min" >
        -
      </button>
    </div>
    <div class="control">
      <input class="input" type="text" v-model="value" />
    </div>
    <div class="control">
      <button @click="increment" class="button"
              :disabled="value + step > max" >
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'integer',
  props: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    },
    default: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      value: this.default
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      newVal = Number(newVal)
      if (newVal <= this.max && newVal >= this.min) {
        this.value = newVal
      } else {
        this.value = oldVal
      }
    }
  },
  methods: {
    decrement () {
      if (this.value >= this.min - this.step) {
        this.value -= this.step
        this.$emit('decrement')
        this.$emit('input', this.value)
      }
    },
    increment () {
      if (this.value <= this.max - this.step) {
        this.value += this.step
        this.$emit('increment')
        this.$emit('input', this.value)
      }
    }
  }
}
</script>
