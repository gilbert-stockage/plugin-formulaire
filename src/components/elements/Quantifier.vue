<template>
  <div
    class="Plugin-Gilbert-SpaceSelector-Quantifier flex flex-col justify-between relative border-gilbert rounded-md text-center"
    style="min-width: 150px;"
  >
    <div class="flex flex-col justify-between p-4 h-full">
      <img
        :src="getImageSrc(item.imgSrc)"
        alt="diminuer la quantité"
        class="cursor-pointer m-auto"
        @click="updateValue(false)"
      >
      <p
        v-if="item.name"
        class="text-lg mt-2"
      >
        {{ item.name }}
      </p>
    </div>
    <div class="flex items-center justify-between border-t border-t-gilbert p-2">
      <img
        :src="getImageSrc('minus')"
        alt="diminuer la quantité"
        class="w-6 md:w-4 cursor-pointer"
        :class="{ 'opacity-25 pointer-events-none' : getItemValue === 0 }"
        @click="updateValue(false)"
      >
      <p>{{ getItemValue }}</p>
      <img
        :src="getImageSrc('add')"
        alt="augmenter la quantité"
        class="w-6 md:w-4 cursor-pointer"
        @click="updateValue(true)"
      >
    </div>
  </div>
</template>

<script>
import general from '@/mixins/general'

export default {
  mixins: [general],
  props: {
    item: {
      default: () => {},
      type: Object
    },
    model: {
      default: '',
      type: String
    }
  },
  computed: {
    getItemValue() {
      if (!this.getForm.quantities) {
        return 0
      }
      let cartItem = this.getForm.quantities[this.model]
      if (cartItem) {
        return cartItem.value
      }
      return 0
    }
  },
  methods: {
    updateValue(boolean) {
      let val = 1;
      if (this.getForm.quantities && this.getForm.quantities[this.model]) {
        let cartItem = this.getForm.quantities[this.model];
        if (!cartItem) {
          cartItem = val
        } else {
          val = boolean? cartItem.value + 1 : cartItem.value - 1
        }
      }
      this.$formPlugin().pushQuantities({ ...this.item, value: val, model: this.model }, boolean)

      if (!this.getForm.quantities) {
        this.$formPlugin().updateForm('volume', 0)
        return
      }
      let closestVolume = this.setClosestVolume(this.getTotalVolumeQuantities, 'step')
      if (closestVolume) {
        this.$formPlugin().updateForm('volume', closestVolume)
      }
    }
  }
}
</script>