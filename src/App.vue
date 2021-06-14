<template>
  <div
    class="Plugin-Gilbert-Main relative h-full flex flex-col bg-white mt-4"
    style="min-height: 100vh;"
  >
    <div
      v-if="isLoading"
      class="Plugin-Gilbert-Main-Loading flex flex-col items-center justify-center"
    >
      <Loading />
    </div>
    <div
      v-else
      class="relative h-full flex flex-col"
    >
      <div
        v-for="step, stepIndex in steps"
        :key="stepIndex"
        :class="['Step mx-auto', {'flex-grow': currentStep === stepIndex + 1}]"
        style="max-width: 1100px;"
      >
        <div
          v-if="currentStep === stepIndex + 1"
          class="CurrentStep flex-grow w-full overflow-hidden z-40 mb-32 md:mb-16"
          :class="computedTransition"
        >
          <header class="text-titre text-gilbert mx-2 mt-4 text-center font-semibold">
            {{ getCurrentStepTitle }}
          </header>
          <div
            class="Step--content w-full flex items-center justify-between flex-grow mb-8"
            style="height: calc(100% - 100px)"
          >
            <component
              :is="getCurrentStep.component"
              :is-calculator-displayed="isCalculator"
              @displayCalculator="isCalculator = !isCalculator"
              @nextCalculatorStep="updateCalculatorStep"
            />
          </div>
        </div>
      </div>
      <footer class="plugin-step-footer w-full bg-white grid grid-cols-12 sm:gap-4 fixed bottom-0 p-2 sm:p-4 z-50 overflow-hidden">
        <div
          class="col-span-2 flex items-center justify-start cursor-pointer"
        >
          <img
            v-if="displayBackArrow"
            class="w-8 h-8"
            src="@/assets/arrow-left.png"
            @click="previousStep"
          >
        </div>
        <div class="col-span-8 flex items-center justify-center">
          <div class="flex items-center">
            <ProgressBar
              :current-step="currentStep"
              :max="steps.length"
            />
          </div>
        </div>
        <div class="col-span-2 flex justify-end">
          <button
            v-if="!isLoading"
            class="btn btn-gilbert lg:text-lg px-2 py-1 md:py-2 md:px-8 rounded text-white focus:outline-none"
            :disabled="isDisabled"
            @click="nextStep"
          >
            {{ getButtonTitle }}
          </button>
          <p v-else>
            Loading
          </p>
        </div>
      </footer>  
    </div>
  </div>
</template>

<script>
import Help from './components/Help'
import Price from './components/Price'
import Transport from './components/Transport'
import Loading from './components/Loading'
import Insurance from './components/Insurance'
import Form from './components/Form'
import Final from './components/Final'
import ProgressBar from './components/elements/ProgressBar'
import SpaceSelector from './components/SpaceSelector'
import General from '@/mixins/general'

export default {
  components: {
    Form,
    Help,
    Insurance,
    Loading,
    ProgressBar,
    Price,
    // eslint-disable-next-line vue/no-unused-components
    SpaceSelector,
    Transport
  },
  mixins:[General],
  data() {
    return {
      isLoading: true,
      steps: [{
        component: 'SpaceSelector',
        title: "De combien d'espace avez-vous besoin?"
      },{
        component: 'Price',
        title: "Votre tarif de stockage"
      },{
        component: 'Help',
        title: "Avez-vous besoin d'aide pour emballer vos cartons, protéger ou démonter vos meubles?"
      },{
        component: 'Transport',
        title: "Comment voulez-vous transporter vos affaires en stockage?"
      },{
        component: 'Insurance',
        title: "Avez-vous besoin d'une assurance supplémentaire?"
      },{
        component: 'Form',
        title: "Votre devis est prêt, recevez-le par e-mail immédiatement :"
      },{
        component: Final,
        title: "Votre devis personnalisé"
      }]
    }
  },
  computed: {
    isDisabled() {
      switch (this.currentStep) {
        case 1:
          return this.getForm.volume === 0
        case 2:
          return false
        case 3:
          return this.getForm.helpNeeded === null
        case 4:
          return this.getForm.transport === null
        case 5:
          return this.getForm.insurance === null
        case 6:
          return this.checkForm()
        case 7:
          return false
        default:
          return true
      }
    },
    displayBackArrow() {
      if (this.currentStep === 1 && this.isCalculator) {
        return true
      }
      return this.currentStep > 1
    },
    getButtonTitle() {
      if (this.currentStep === 6) {
        return 'Recevoir le devis'
      }
      if (this.currentStep === 7) {
        return 'Réserver'
      }
      return 'Suivant'
    },
    getCurrentStepTitle() {
      if (this.currentStep === 1) {
        if (this.stepCalculator === 1) {
          return 'Je calcule l’espace dont j’ai besoin'
        } else if (this.stepCalculator === 2) {
          return 'Qu’allez-vous stocker ?'
        } else if (this.stepCalculator === 3) {
          return 'Quelle est la taille de votre logement ?'
        } else {
          return this.getCurrentStep.title
        }
      }
      return this.getCurrentStep.title
    },
    computedTransition() {
      return this.next ? 'nextTransition' : 'previousTransition'
    },
    getCurrentStep() {
      return this.steps[this.currentStep - 1]
    }
  },
  watch: {
    getForm: {
      deep: true,
      immediate: true,
      handler(o, n) {
        if (n) {
          switch (this.currentStep) {
            case 1:
              if (!this.isCalculator) {
                this.nextStep()
              }
              return;
            case 3:
              if (n.helpNeeded !== null) {
                this.nextStep()
              }
              return;
            case 4:
              if (n.transport !== null) {
                this.nextStep()
              }
              return;
            case 5:
              if (n.insurance !== null) {
                this.nextStep()
              }
              return;
            default:
              break;
          }
        }
      }
    }
  },
  mounted() {
    // window.location.href = window.location.href + '?question=' + this.currentStep
    if (ga) {
      ga('send', 'event', 'Lancement du formulaire');
    }
    setTimeout(() => {
      this.isLoading = false
    }, 1250);
  },
  methods: {
    updateCalculatorStep(value) {
      // reset spaceSelector when option is taken
      this.stepCalculator = value
    },
    hideCalculator() {
      this.stepCalculator = 0
      this.isCalculator = false
      this.$formPlugin().resetForm()
    },
    previousStep() {
      this.next = false
      window.scrollTo(0, 0);
      if (this.currentStep > 1) {
        this.currentStep--
      }
      if (this.currentStep === 1) {
        this.stepCalculator = 0
        this.isCalculator = false
      }
    },
    async nextStep() {
      if (this.currentStep === 6) {
        await this.sendHubspotData()
      }
      if (this.currentStep === 7) {
        window.open('https://gilbert.paris/reserver/', '_blank')
        return
      }
      window.scrollTo(0, 0);
      this.stepCalculator = undefined
      this.next = true
      if (this.currentStep < this.steps.length) {
        this.currentStep++
      }
      if (ga) {
        ga('send', 'event', `Question ${this.currentStep}`);
      }
    },
    sendHubspotData() {
      if (!this.getForm) {
        return
      }
      let addProperties = [{
          property:'firstname',
          value: this.getForm.firstName
        }, {
          property:'lastname',
          value: this.getForm.lastName
        }, {
          property:'phone',
          value: this.getForm.phone
        }, {
          property:'email',
          value: this.getForm.mail
        }, {
          property:'devis__liste_des_meubles',
          value: this.getForm.quantities
        }, {
          property:'devis__manutention',
          value: this.getForm.helpNeeded.value
        }, {
          property:'devis__assurance',
          value: this.getForm.insurance.title.replace('Assurance ', '')
        }, {
          property:'devis__volume_de_stockage_estime',
          value: this.getForm.volume
        }, {
          property:'devis__transport_en_stockage',
          value: this.getForm.transport.tag
        }, {
          property:'devis__prix_transport',
          value: this.getForm.transport.footer.priceValue
        }, {
          property:'devis__prix_du_stockage_estime',
          value: this.getPriceModel.price.replace('€/mois', '')
        }]
      let data = {
        "properties": []
      };

      addProperties.forEach((x) => {
        if (x.property === 'devis__liste_des_meubles') {
          if (this.getForm.quantities) {
            let str = '';
            Object.values(this.getForm.quantities).forEach((x) => {
              let target = `${x.value} ${x.name}`;
              str = str.length > 1 ? `${str}, ${target}`: `${target}`
            })
            x.value = str
          }
        }
        data.properties.push({
          "property": x.property,
          "value": x.value
        })
      })

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://gilbert-hubspot-server.herokuapp.com/createOrUpdate', true)
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({
        properties: data.properties,
        email: this.getForm.mail
      }))
    }
  }
}
</script>

<style>
@import 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap');

  .Plugin-Gilbert-Main {
    font-family: Open Sans,sans-serif;
    line-height: 1.42;
    color: #18404B;
  }

  .nextTransition {
    display: inline-block;
    animation: slideInUp; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 500ms; /* don't forget to set a duration! */
  }

  .previousTransition {
    display: inline-block;
    animation: slideInDown; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 500ms; /* don't forget to set a duration! */
  }

/** Reset **/
  .btn {
    outline: 0px;
    box-shadow: 0px;
  }

  .btn:disabled {
    opacity: 0.25;
    pointer-events: none;
  }

  .btn-gilbert {
    background-color: #407f7f;
    border: 2px solid #407f7f;
  }

  .btn-gilbert-outline {
    border: 2px solid #407f7f;
  }

  .plugin-step-footer {
    -webkit-box-shadow: 0px -2px 23px -1px rgba(0,0,0,0.1); 
    box-shadow: 0px -2px 23px -1px rgba(0,0,0,0.1);
  }

  .bg-gilbert {
    background-color: #407f7f;
  }

  .bg-gilbert-light {
    background-color: #e7f5f5;
  }

  .text-gilbert {
    color: #18404B;
  }

  .text-bouton {
    color: #407f7f;
  }

  .text-open {
    font-family: Open Sans,sans-serif;
}

  .border-gilbert {
    border: 2px solid #407f7f;
  }

  .border-gilbert-light {
    border: 2px solid #00cfbf;
  }

  .border-t-gilbert {
    border-top: 2px solid #407f7f;
  }

  input:focus {
    box-shadow: 0px;
    outline: none;
  }

  /* Custom */

  .text-titre {
    font-size: 40px;
    padding-bottom: 20px;
    color: #407F7F;
    font-family: Poppins,sans-serif;
  }

  @media (max-width: 768px) {
    .text-titre {
      font-size: 28px;
    }
  }

  .text-base {
    font-size: 18px!important;
    line-height: 1.2;
    font-weight: 400;
  }

  .text-reassurance {
    font-size: 16px!important;
  }

  .text-price {
    font-size: 24px!important;
  }

  .text-base-lg {
    font-size: 20px!important;
  }

  @media (max-width: 768px) {
    .text-base-lg {
      font-size: 16px;
    }
  }

  .text-card-title {
    font-size: 28px!important;
    line-height: 1.2;
    font-family: Poppins,sans-serif;
  }

  @media (max-width: 768px) {
    .text-card-title {
      font-size: 20px;
    }
  }
  
</style>