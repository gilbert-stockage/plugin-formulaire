<template>
  <div class="Plugin-Gilbert-Form mx-auto w-full">
    <div class="grid grid-col-1 md:grid-cols-7 gap-y-4 md:gap-4 w-full px-4">
      <div class="col-span-2 order-2 md:order-1">
        <div class="bg-gilbert-light border-gilbert-light p-6 rounded-lg cache-mobile" style="display:none;">
          <img
            src="https://gilbert.paris/wp-content/uploads/2021/05/gilbert-paris-.png.webp"
            alt="Stella"
            class="w-24 mx-auto mb-4"
          >
          <h2 class="font-semibold mb-2">
            {{ comment.title }}
          </h2>
          <p class="text-sm text-open">
            {{ comment.description }}
          </p>
        </div>
      </div>
      <div class="col-span-3 order-1">
        <div class="border-gilbert rounded-md p-4 lg:px-16 lg:py-8 text-center">
          <div 
            v-for="item, itemIndex in options"
            :key="itemIndex"
            class="Plugin-Gilbert-Form-Label"
            :class="itemIndex === 3 ? 'mb-0' : 'mb-6'"
          >
            <p class="text-base text-left text-gilbert font-semibold">
              {{ item.label }}
            </p>
            <input
              v-model="getForm[item.model]"
              maxlength="35"
              type="text"
              class="bg-gilbert-light w-full rounded-sm p-1"
              @input="checkForm"
            >
          </div>
        </div>
      </div>
      <div class="col-span-2 order-3" style="display:none;">
        <div
          class="text-sm text-open bg-gilbert-light px-4 py-6 rounded-lg mb-4"
          v-html="commit" 
        />
        <div class="border border-gray-200 rounded-lg p-4 w-full" style="display:none;">
          <img
            src="https://gilbert.paris/wp-content/uploads/2021/06/google-stars.png"
            alt="Google"
            class="w-32 mx-auto mb-4"
          >
          <p class="text-sm text-open font-semibold text-center">
            Basé sur 32 avis.
          </p>
        </div>
      </div>
    </div>
          <div
        class="flex flex-col md:flex-row items-center text-gilbert bg-gilbert-light mx-4 md:mx-auto p-4 rounded-lg"
        style="margin-top:20px;"
      >
        <p class="text-reassurance text-open text-center md:text-left">
          <span class="font-semibold"> ❔ Pourquoi dois-je laisser mon n° de téléphone ?</span><br>
          <span>2 clients sur 3 surestiment le volume de stockage dont ils ont besoin. Vous appeler permet de vérifier si c'est votre cas et d'adapter votre devis de stockage afin de vous proposer un devis le plus proche possible de la réalité et de vos besoins. A ces fins, vos informations peuvent être transmises à un tiers.</span>
        </p>
      </div>
  </div>
</template>

<script>
import General from '../mixins/general'
export default {
  mixins: [General],
  data() {
    return {
      comment: {
        description: '« Ayant déménagé dans un nouvel appartement, Gilbert me permet de conserver mes meubles et affaires de famille dont je n\'ai plus besoin mais que je souhaite garder. Service parfaitement adapté. »',
        title: 'Stella déménageait et voulait stocker une partie de ses affaires'
      },
      commit: "✔️ L’engagement Gilbert :<br><br>Vos données personnelles ne seront en aucun cas  communiquées à des tiers.<br><br>Elles ne nous servent qu’à  établir votre devis personnalisé et à vous le transmettre. ",
      options: [{
        label: 'Votre prénom :',
        model: 'firstName'
      }, {
        label: 'Votre nom :',
        model: 'lastName'
      }, {
        label: 'Votre numéro de téléphone :',
        model: 'phone'
      }, {
        label: 'Votre adresse e-mail :',
        model: 'mail'
      }]
    }
  }
}
</script>