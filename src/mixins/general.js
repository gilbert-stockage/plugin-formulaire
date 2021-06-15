const General = {
  data() {
    return {
      colors: {
        green: '#407f7f'
      },
      currentStep: 1, // TO DO 1
      currentCalculatorStep: 1, // TO DO 1
      calculatorCurrentStep: 'Salon',
      isCalculator: false, // TO DO false
      isLoading: false,
      next: true,
      stepCalculator: null, // TO DO null,
    }
  },
  computed: {
    getForm() {
      if (!this.$formPlugin()) {
        return {}
      }
      return this.$formPlugin().form
    },
    getModel() {
      if (!this.$formPlugin()) {
        return {}
      }
      return this.$formPlugin().model
    },
    getPriceModel() {
      if (!this.getForm && !this.getPrices && !this.getVolume) {
        return {}
      }
      let volume = this.getVolume
      if (volume && this.getVolume && !this.getPrices[volume.toString()]) {
        volume = this.setClosestVolume(this.getVolume, 'step')
      }
      let volumeImages = {
        '0.5': 'placard',
        '1.5': 'cave',
        '3': 'studio',
        '6': '2_pieces',
        '9': '3_pieces',
      }
      let imageSrc;
      imageSrc = volumeImages[this.getVolume.toString()] ? volumeImages[this.getVolume.toString()] : 'maison_entiere'
      let model = {
        price: `${this.getPrices[volume].transport_storage}€/mois`,
        imageSrc,
        volume
      }
      return model
    },
    getPrices() {
      if (!this.$formPlugin()) {
        return {}
      }
      return this.$formPlugin().prices
    },
    getVolume() {
      if (!this.getForm) {
        return {}
      }
      return this.getForm.volume
    },
    getTotalVolumeQuantities() {
      if (!this.getForm && !this.getForm.quantities) {
        return 0
      }
      let arr = Object.values(this.getForm.quantities)
      let result = 0;
      if (arr.length > 0) {
        arr.forEach((x) => {
          result = result + (x.value * x.volume)
        })
      }
      return result
    }
  },
  methods: {
    checkForm() {
      if (!this.getForm) {
        return true
      }
      if (this.getForm.firstName && this.getForm.lastName && this.getForm.phone && this.getForm.mail) {
        return !(this.getForm.firstName.length > 2 && this.getForm.lastName.length > 2 && this.getForm.phone > 1 && this.validateEmail(this.getForm.mail))
      }
      return true
    },
    getImageSrc(imgSrc) {
      // switch avec le type d'image
      return require(`@/assets/${imgSrc}.png`)
    },
    setClosestVolume(volume, type) {
      if (!this.getForm && !volume && volume === null && !type) {
        return 0
      }
      let arr = Object.keys(this.getPrices).map(x => parseFloat(x)).sort(function (a, b) { return a - b; })
      let vol;
      if (type === 'size') {
        vol = parseFloat(volume) / 4
      } else if (type === 'step') {
        vol = volume
      }
      let closest = arr.filter((x) => {
        return x > vol
      })
      if (!closest.length) {
        return 30
      }
      return closest[0]
    },
    validatePhone(phone) {
      const re = /^(33|0)(6|7|9)\d{8}$/
      return re.test(phone)
    },
    validateEmail(email) {
      if (!email) { return false }
      // const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      // return pattern.test(String(email).toLowerCase())
      return email.length > 1
    }
  }
}

export default General