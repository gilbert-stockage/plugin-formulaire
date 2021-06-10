<template>
  <div class="Step-progress-bar flex items-center overflow-hidden">
    <p class="text-base block text-gilbert text-sm font-semibold mr-2">
      {{ currentStep }}/{{ max }}
    </p>
    <div
      class="Step-progress-bar border-gilbert h-4"
      style="width: 125px"
    >
      <div
        class="Step-progress-bar-progression bg-gilbert h-3"
        :style="`width: ${getWidth}%`"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    currentStep: {
      default: 0,
      type: Number
    },
    max: {
      default: 0,
      type: Number
    }
  },
  computed: {
    getWidth() {
      if (!this.currentStep && !this.max) {
        return 0
      }
      return 100 / this.max * this.currentStep
    }
  }
}
</script>