<template>
  <div class="Plugin-Gilbert-Insurance mx-auto">
    <header>
      <p class="text-center font-semibold text-base text-gilbert mb-8 mx-4 md:mx-0">
        Vos biens sont assurés par notre partenaire Axa. <img src="https://gilbert.paris/wp-content/uploads/2021/06/axa.jpg">
      </p>
    </header>
    <div class="w-full flex items-center justify-center">
      <div
        class="grid grid-col-1 md:grid-cols-3 gap-5"
      >
        <Card
          v-for="item, itemIndex in options"
          :key="itemIndex"
          :content="item"
          origin="insurance"
          @selection="sendModel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './elements/Card'

export default {
  components: {
    Card
  },
  data() {
    return {
      options: [{
        type: 'short',
        id:'basic',
        description: 'Vos affaires sont assurées à hauteur de 100€/m3.',
        footer: {
          price: 'Gratuit',
          priceValue: 0,
          button: true
        },
        pastileSrc: 'inclus',
        imageSrc: 'basique',
        tag: "Basique (incluse)",
        title: "Basique",
      }, {
        type: 'short',
        id:'standard',
        description: 'Vos affaires sont assurées à hauteur de 1000€.',
        footer: {
          price: '12€/mois',
          priceValue: 12,
          button: true
        },
        pastileSrc: 'popular',
        imageSrc: 'standard',
        tag: "Standard",
        title: "Standard"
      }, {
        type: 'short',
        id:'premium',
        description: 'Vos affaires sont assurées à hauteur de 2500€.',
        footer: {
          price: '25€/mois',
          priceValue: 25,
          button: true
        },
        pastileSrc: 'secure',
        imageSrc: 'premium',
        tag: "Premium",
        title: "Premium"
      }]
    }
  },
  methods: {
    sendModel({ content }) {
      this.$formPlugin().updateForm('insurance', content)
    },
  }
}
</script>