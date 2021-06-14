<template>
  <div class="Plugin-Gilbert-Transport mx-auto">
    <header>
      <p class="text-center font-regular text-sm md:text-base text-gilbert mb-8 mx-4 md:mx-0">
        Notre entrepôt ultra-sécurisé se situe à Evry (91) pour vous proposer une offre de stockage à tarif très compétitif.
      </p>
    </header>
    <div class="w-full flex items-center justify-center">
      <div
        class="grid grid-col-1 md:grid-cols-3 gap-5"
      >
        <Card
          v-for="item, itemIndex in getOptions"
          :key="itemIndex"
          :content="item"
          origin="transport"
          @selection="sendModel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './elements/Card'
import General from '@/mixins/general'

export default {
  components: {
    Card
  },
  mixins: [General],
  computed: {
    getOptions() {
      if (!this.getForm && !this.getPrices) {
        return {}
      }
      let options = [{
        type: 'short',
        id: 'transport_floor',
        description: undefined,
        footer: {
          price: 0,
          priceValue: 0,
          button: true
        },
        pastileSrc: 'easiest',
        imageSrc: 'transport_floor',
        tag: "Collecte à l'étage",
        title: "J’aimerais que l’on vienne chercher mes affaires chez moi, à l’étage",
      }, {
        type: 'short',
        id: 'transport_downstairs',
        description: '✔️ 1 chauffeur livreur<br>✔️ Véhicule adapté<br>✔️ Essence incluse<br>✔️ Stationnement inclus<br>✔️ Mise en stockage',
        footer: {
          price: 0,
          priceValue: 0,
          button: true
        },
        pastileSrc: 'popular',
        imageSrc: 'transport_downstairs',
        tag: "Collecte au pied de l'immeuble",
        title: "J’aimerais que l’on collecte mes affaires au pied de mon immeuble"
      }, {
        type: 'short',
        id: 'transport_storage',
        description: 'Vous déposez vos affaires vous-même en stockage.<br>C’est l’offre la plus économique.',
        footer: {
          price: 'Gratuit',
          priceValue: 0,
          button: true
        },
        pastileSrc: 'cheapest',
        imageSrc: 'transport_storage',
        tag: "Dépôt à l'entrepôt",
        title: "Je les dépose moi-même à l’entrepôt à Evry (91)"
      }]
      options.forEach((x) => {
        let type = x.imageSrc
        if (type === 'transport_storage') {
          return
        }
        if (this.getPrices[this.getVolume]) {
          if (type === 'transport_floor') {
            x.description = `✔️ ${this.getPrices[this.getVolume].demenageurs || 1} déménageurs<br>✔️ Véhicule adapté<br>✔️ Essence incluse<br>✔️  Stationnement inclus<br>✔️ Mise en stockage<br>`
          }
          let price = this.getPrices[this.getVolume][type]
          x.footer.price = `${price}€`
          x.footer.priceValue = price
        }
      })
      return options
    }
  },
  methods: {
    sendModel({ content }) {
      this.$formPlugin().updateForm('transport', content)
    },
  }
}
</script>