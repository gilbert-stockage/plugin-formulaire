<template>
  <div class="Plugin-Gilbert-Calculator w-full">
    <div
      v-if="currentCalculatorStep === 1"
      class="grid grid-col-1 md:grid-cols-2 gap-5"
    >
      <Card
        v-for="item, itemIndex in options"
        :key="itemIndex"
        :content="item"
        @selection="selectCalculator"
      />
    </div>
    <QuantifierList
      v-if="currentCalculatorStep === 2"
    />
    <SpaceSizer v-if="currentCalculatorStep === 3" />
  </div>
</template>

<script>
import Card from './elements/Card'
import QuantifierList from './elements/QuantifierList'
import SpaceSizer from './elements/SpaceSizer'
import General from '../mixins/general'

export default {
  components: {
    Card,
    QuantifierList,
    SpaceSizer
  },
  mixins: [General],
  data() {
    return {
      options: [{
        type: 'short',
        model: {
          step: 2
        },
        description: 'En faisant la liste de mes meubles à stocker',
        footer: {
          button: true
        },
        imageSrc: 'estim_app',
        title: 'Je calcule précisément mon volume'
      },{
        type: 'short',
        model: {
          step: 3
        },
        description: 'En indiquant la taille de mon logement.',
        footer: {
          button: true
        },
        imageSrc: 'estim_pre',
        title: 'J’évalue approximativement mon volume'
      }]
    }
  },
  methods: {
    selectCalculator(v) {
      if (typeof v.model === 'object') {
        if (v.model.step) {
          this.currentCalculatorStep = v.model.step
          this.$emit('updateStep', v.model.step)
        }
      }
    }
  }
}
</script>