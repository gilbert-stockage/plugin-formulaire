<template>
  <div class="Plugin-Gilbert-SpaceSelector-QuantifierList">
    <header
      class="grid grid-cols-1 md:grid-cols-3 md:gap-2 mx-auto mb-8 px-2"
      style="max-width: 500px;"
    >
      <button
        v-for="step, stepIndex in getOptions"
        :key="stepIndex"
        class="btn w-full text-md px-8 py-1 md:p-2 rounded focus:outline-none mb-2 md:mb-0"
        :class="calculatorCurrentStep === stepIndex ? 'btn-gilbert text-white' : 'btn-gilbert-outline text-gilbert'"
        @click="calculatorCurrentStep = stepIndex"
      >
        {{ stepIndex }}
      </button>
    </header>
    <div
      class="grid grid-cols-1 gap-4 px-2" 
      :class="getCurrentListStepLength === 6 ? 'md:grid-cols-3' : 'md:grid-cols-4' "
    >
      <Quantifier 
        v-for="item, itemName in getCurrentListStep"
        :key="itemName"
        :current-step="calculatorCurrentStep"
        :item="item"
        :model="itemName"
      />
    </div>
  </div>
</template>

<script>
import Quantifier from './Quantifier.vue'
import General from '@/mixins/general'

export default {
  components: {
    Quantifier
  },
  mixins: [General],
  computed: {
    getCurrentListStep() {
      return this.getOptions[this.calculatorCurrentStep]
    },
    getCurrentListStepLength() {
      if (!this.getCurrentListStep) {
        return 0
      }
      return Object.values(this.getCurrentListStep).length
    },
    getOptions() {
      return this.getModel
    }
  }
}
</script>