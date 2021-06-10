<template>
  <div class="Plugin-Gilbert-SpaceSelector-SpaceSizer flex flex-col items-center w-full p-2 md:p-0 text-base">
    <div class="border-gilbert rounded-lg w-full mx-auto p-2 md:p-8 text-center mb-4">
      <h2 class="mb-4">
        Indiquez la surface en ㎡ que vous comptez déménager ou mettre en stockage :
      </h2>
      <p class="text-base">
        Votre surface est de :
        <span class="font-semibold">
          {{ volume }} ㎡
        </span>
      </p>
      <input
        id="customRange1"
        v-model="volume"
        type="range"
        class="w-full my-8 bg-gilbert"
        min="1"
        max="150"
        @input="setVolume"
      >
      <div>
        <p>
          Votre estimation de volume de stockage est de :
        </p>
        <p class="text-2xl font-semibold">
          {{ getForm.volume }} m³
        </p>
      </div>
    </div>
    <div
      class="flex items-center mx-auto text-gilbert bg-gilbert-light p-4 rounded-lg mb-8"
      style="max-width: 750px;"
    >
      <p>
        <span class="font-semibold">Pas de panique !</span> Si l’estimation est erronée, le tarif que nous allons vous proposer pourra être ajusté à la hausse ou à la baisse en fonction de votre volume réel de stockage.<br><br>Si vous souhaitez obtenir une estimation plus précise, calculez votre volume en faisant la liste de vos meubles et affaires à stocker.
      </p>
    </div>
  </div>
</template>

<script>
import General from '@/mixins/general'
export default {
  mixins: [General],
  data() {
    return {
      volume: 1
    }
  },
  methods: {
    setVolume(e) {
      let value = parseFloat(e.target.value)
      let volume = this.setClosestVolume(value, 'size')
      this.$formPlugin().updateForm('volume', volume)
    }
  }
}
</script>