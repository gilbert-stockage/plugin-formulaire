<template>
  <div
    class="Plugin-Gilbert-SpaceSelector flex flex-col items-center w-full"
  >
    <div
      v-if="!isCalculatorDisplayed"
      class="Plugin-Gilbert-SpaceSelector-Slider flex flex-col items-center"
    >
      <div class="flex items-center">
        <div class="mr-4 cursor-pointer">
          <img
            :src="getImageSrc('left-chevron')"
            alt="back to left"
            style="width: 56px;"
            class="hidden md:block"
            :class="{ 'opacity-25 pointer-events-none' : step === 0 }"
            @click="step = 0"
          >
        </div>
        <div class="grid grid-col-1 md:grid-cols-3 gap-5 my-4">
          <Card
            v-for="item, itemIndex in getOptions"
            :key="itemIndex"
            :content="item"
            origin="spaceSelector"
            @selection="sendModel"
          />
        </div>
        <div class="ml-4 cursor-pointer">
          <img
            :src="getImageSrc('left-chevron')"
            alt="back to left"
            class="hidden md:block transform rotate-180"
            style="width: 56px;"
            :class="{ 'opacity-25 pointer-events-none' : step === 3 }"
            @click="step = 3"
          >
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center text-gilbert bg-gilbert-light mx-4 md:mx-auto p-4 rounded-lg"
        style="max-width: 850px;"
      >
        <img
          :src="getImageSrc('pig')"
          alt="un doute sur votre espace"
          class="w-16 md:mr-4"
        >
        <p class="text-reassurance text-open text-center md:text-left">
          <span class="font-semibold">Vous avez un doute sur l’espace dont vous avez besoin ? </span>
          <span>Pas de problème : nous réduirons
            automatiquement votre coût mensuel de stockage si vous avez besoin de moins d’espace.</span>
        </p>
      </div>
      <p
        class="text-base block text-center text-gilbert my-4 underline cursor-pointer"
        @click="displayCalculator"
      >
        Aidez-moi à estimer mon volume de stockage
      </p>
    </div>
    <Calculator
      v-else
      @updateStep="emitNextCalculatorStep"
    />
  </div>
</template>

<script>
import Calculator from './Calculator'
import Card from './elements/Card'
import general from '../mixins/general'

export default {
  props: {
    isCalculatorDisplayed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Calculator,
    Card
  },
  mixins: [general],
  data: () => ({
    step: 0,
    options: [{
      id: 'placard',
      description: 'Idéal si vous n’avez que quelques affaires à stocker. Parfait pour quelques cartons ou valises.<br><br>Espace de stockage : 0,5m³',
      footer: {
        button: true,
        price: '29€/mois',
        priceValue: 29,
      },
      imageSrc: 'space_placard',
      title: 'Placard',
      volume: 0.5
    },{
      id: 'cave',
      description: 'Convient pour des meubles de petite taille et jusqu’à 25 cartons standards. Parfait  pour libérer une pièce !<br><br>Espace de stockage : 1,5 m³',
      footer: {
        button: true,
        price: '43€/mois',
        priceValue: 43,
      },
      imageSrc: 'space_cave',
      title: 'Cave',
      volume: 1.5
    },{
      id: 'studio',
      description: 'Convient pour des meubles de taille moyenne telles qu’une table, des chaises, un réfrigérateur, etc.<br><br>Espace de stockage : 3 m³',
      footer: {
        button: true,
        price: '64€/mois',
        priceValue: 64,
      },
      imageSrc: 'space_studio',
      title: 'Studio',
      volume: 3
    }, {
      id: '2_pieces',
      description: 'Stockez du mobilier de grande taille : canapé, vélo, armoire, meuble TV, des cartons, etc.<br><br>Espace de stockage : 6 m³',
      footer: {
        button: true,
        price: '104€/mois',
        priceValue: 104,
      },
      imageSrc: 'space_2_pieces',
      title: '2 pièces',
      volume: 6
    },{
      id: '3_pieces',
      description: 'Idéal pour stocker vos meubles et de nombreux cartons en vue de votre déménagement.<br><br>Espace de stockage : 9 m³',
      footer: {
        button: true,
        price: '139€/mois',
        priceValue: 139,
      },
      imageSrc: 'space_3_pieces',
      title: '3 pièces',
      volume: 9
    },{
      id: 'maison_entiere',
      description: 'Idéal si vous avez besoin d’espace pour stocker plusieurs pièces !<br><br>Espace de stockage : sur mesure',
      footer: {
        button: 'contact',
        price: 'Dès<br>162€/mois',
        priceValue: 162
      },
      imageSrc: 'space_maison_entiere',
      title: 'Maison entière',
      volume: 'sur mesure'
    }],
    responsive: false
  }),
  computed: {
    getScreenSize() {
      return window.innerWidth < 768
    },
    getOptions() {
      if (!this.responsive) {
        return this.options.slice(this.step, this.step + 3)
      }
      return this.options
    }
  },
  mounted() {
    window.onresize = () => {
      if (window.innerWidth < 768) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  },
  watch: {
    hideCalculator: {
      handler(o, n) {
        console.log(n)
      }
    }
  },
  methods: {
    displayCalculator() {
      this.$emit('displayCalculator')
      this.emitNextCalculatorStep(1)
    },
    emitNextCalculatorStep(value) {
      this.$emit("nextCalculatorStep", value)
    },
    sendModel({ content }) {
      this.$formPlugin().updateForm('spaceSelector', content)
    }
  }
}
</script>