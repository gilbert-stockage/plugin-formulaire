<template>
  <div class="Plugin-Gilbert-Help mx-auto">
    <div
      class="grid grid-col-1 md:grid-cols-2 gap-2"
    >
      <Card
        v-for="item, itemIndex in options"
        :key="itemIndex"
        :content="item"
        origin="helpNeeded"
        @selection="sendModel"
      />
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
        id:'help_true',
        value: true,
        description: 'Nos déménageurs effectuent les tâches demandées  (emballage, démontage,  protection, remontage...)',
        footer: {
          button: true
        },
        imageSrc: 'carton_ferme',
        title: "Oui, j\'aimerais avoir de l'aide",
      }, {
        type: 'short',
        id:'help_false',
        value: false,
        description: 'Emballez vos affaires et notre équipe vous retrouve pour  vous aider à les charger  dans notre camion.',
        footer: {
          button: true
        },
        imageSrc: 'carton_ouvert',
        title: 'Non, je vais le faire moi-même'
      }]
    }
  },
  methods: {
    sendModel({ content }) {
      this.$formPlugin().updateForm('helpNeeded', content)
    },
  }
}
</script>