<template>
  <div class="Plugin-Gilbert-Final">
    <header>
      <p class="text-center font-semibold text-base text-gilbert mb-8 mx-4 md:mx-0">
        Voici votre devis de stockage, il vient de vous être envoyé par e-mail.
      </p>
    </header>
    <div class="w-full flex items-center justify-center">
      <div
        class="grid grid-col-1 gap-y-2 md:gap-5 md:mb-8"
        :class="getOptions.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'"
      >
        <Card
          v-for="item, itemIndex in getOptions"
          :key="itemIndex"
          :content="item"
          origin="transport"
        />
      </div>
    </div>
    <div
      class="flex items-center mx-auto text-gilbert text-open bg-gilbert-light px-4 py-3 rounded-lg"
      style="max-width: 970px;"
    >
      <p class="text-base">
        <span class="font-semibold">🔐 Réservez votre espace de stockage dès maintenant pour verrouiller votre tarif personnalisé !</span><br>
        <span>✔️  Pas de frais de dossier</span><br>
        <span>✔️  Prix bloqué et garanti à vie</span>
      </p>
    </div>
      <p
        class="text-base block text-center text-gilbert my-4 underline cursor-pointer"
        @click="openQuestions"
      >
        Des questions ? Parlez à l'un de nos conseillers
      </p>
  </div>
</template>

<script>
import Card from '@/components/elements/Card'
import General from '@/mixins/general'

export default {
  components: {
    Card
  },
  mixins: [General],
  computed: {
    getOptions() {
      let model = []
      let newForm = this.getForm
      if (newForm.helpNeeded) {
        if (newForm.helpNeeded.value === true) {
          newForm.helpNeeded.title = 'Emballage et manutention'
          newForm.helpNeeded.description = '✔️ Démontage et/ou remontage des meubles<br>✔️  Emballages illimités<br>✔️  Fournitures incluses'
          newForm.helpNeeded.footer.price = '29€/heure'
          newForm.helpNeeded.footer.priceDescription = 'Par déménageur'
          model.push(newForm.helpNeeded)
        }
      }
      if (newForm.transport) {
        switch (newForm.transport.id) {
          case 'transport_floor':
            newForm.transport.title = 'Collecte à l\'étage et transport'
            break;
          case 'transport_downstairs':
            newForm.transport.title = 'Collecte en bas de l\'immeuble'
            break;
          case 'transport_storage':
            newForm.transport.title = 'Vous déposez vos affaires vous-même en stockage'
            break;
          default:
            break;
        }
        if (newForm.transport.footer.price !== 'Gratuit') {
          newForm.transport.footer.priceDescription = 'Paiement unique'
        }
        model.push(newForm.transport)
      }
      if (!newForm.spaceSelector) {
        newForm.spaceSelector = {}
      }
      if (newForm.spaceSelector) {
        newForm.spaceSelector.title = 'Stockage sécurisé'
        newForm.spaceSelector.description = "✔️ Accès illimité à vos affaires<br>✔️ Relivraison de vos  affaires à tout moment<br>✔️ Sans engagement de durée"
        newForm.spaceSelector.imageSrc = 'stockage_secure'
        if (!newForm.spaceSelector.footer) {
          newForm.spaceSelector.footer = {}
        }
        if (newForm.spaceSelector.footer) {
          newForm.spaceSelector.footer.priceDescription = 'Paiement mensuel'
          newForm.spaceSelector.footer.price = `${this.getPrices[this.getVolume].transport_storage}€/mois`
        }
        model.push(newForm.spaceSelector)
      }
      if (newForm.insurance) {
        newForm.insurance.title = `Assurance ${newForm.insurance.title.replace('Assurance ', '')}`
        if (newForm.insurance.footer.price !== 'Gratuit') {
          newForm.insurance.footer.priceDescription = 'Paiement mensuel'
        }
        model.push(newForm.insurance)
      }
      model.forEach((x) => {
        delete x.type
        delete x.pastileSrc
        delete x.footer.button
      })
      return model
    }
  },
  methods: {
    openQuestions() {
      window.open('https://gilbert.paris/rendez-vous/', '_blank')
    }
  }
}
</script>