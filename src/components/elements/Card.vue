<template>
  <div
    class="Stepper-Card flex flex-col justify-start relative border-gilbert rounded-md p-4 text-center"
    :style="`max-width: ${content.type === 'short'? '300px' : '360px'};`"
  >
    <div
      v-if="content.pastileSrc"
      class="absolute -top-4 -right-4 z-50"
    >
      <img
        :src="getImageSrc(content.pastileSrc)"
        class="mx-auto h-20"
      >
    </div>
    <header
      v-if="content.imageSrc"
      class="mb-4"
    >
      <img
        :src="getImageSrc(content.imageSrc)"
        class="mx-auto my-4"
      >
    </header>
    <div class="flex flex-col justify-between h-full">
      <h2
        v-if="content.title"
        class="text-card-title font-semibold mb-2"
        v-html="content.title"
      />
      <p
        v-if="content.description"
        class="text-base text-gray-700 flex-grow"
        :class="content.type === 'short' ? 'text-center' : 'text-left'"
        v-html="content.description"
      />
      <slot
        v-else
        name="description"
        class="text-gray-500 text-left"
      />
      <div
        v-if="content.footer"
        class="flex flex-col lg:flex-row items-center justify-between mt-8"
      >
        <div
          v-if="content.footer.price"
          class="mx-2 mb-3 lg:mb-0"
          :class="{ 'w-full': !content.footer.button }"
        >
          <p
            class="font-semibold whitespace-nowrap text-base-lg mb-0"
            v-html="content.footer.price"
            :class="{ 'text-card-title': !content.footer.button }"
          />
          <p
            v-if="content.footer.priceDescription"
            class="text-sm text-gray-700 text-center"
          >
            {{ content.footer.priceDescription }}
          </p>
        </div>
        <div
          v-if="content.footer.button === true || content.footer.button === 'contact'"
          class="w-full flex-wrap"
          :class="content.footer.price ? 'ml-2' : 'ml-0'"
        >
          <button
            class="btn w-full text-base font-medium py-3 px-4 rounded focus:outline-none overflow-hidden"
            :class="[{ 'w-full' : !content.footer.price }, isSelected ? 'btn-gilbert text-white' : 'btn-gilbert-outline text-gilbert']"
            @click="getButtonAction"
          >
            {{ getButtonTitle }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      default: () => {},
      type: Object
    },
    origin: {
      default: '',
      type: String
    }
  },
  computed: {
    getButtonTitle() {
      if (!this.content) {
        return ''
      }
      if (this.content.footer.button === 'contact') {
        return 'Contact'
      }
      return this.isSelected ? 'Sélectionné' : 'Sélectionner'
    },
    isSelected() {
      if (!this.origin || !this.$formPlugin() || !this.content) {
        return false
      }
      let data = this.$formPlugin().getForm()
      if (data && data[this.origin] && this.content) {
        return data[this.origin].id === this.content.id
      }
      return false
    },
  },
  methods: {
    getButtonAction() {
      if (this.content.footer.button === 'contact') {
        this.contact()
      } else {
        this.sendSelection()
      }
    },
    contact() {
      window.open('https://gilbert.paris/contact/', '_blank')
    },
    getImageSrc(imgSrc) {
      return require(`@/assets/${imgSrc}.png`)
    },
    sendSelection() {
      this.$emit('selection', {
        model: this.content.model,
        content: this.content
      })
    }
  }
}
</script>