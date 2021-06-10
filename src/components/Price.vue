<template>
  <div class="Price px-2 lg:px-0 text-base">
    <div class="Stepper-Price-Card flex flex-col justify-start relative border-gilbert rounded-md p-4 text-center mb-8 text-gilbert">
      <div class="mx-auto mb-4">
        <img
          :src="getImageSrc(getPriceModel.imageSrc)"
          alt="tarif"
          style="max-width: 300px;"
        >
      </div>
      <div
        class="mb-4"
      >
        <h2 
          v-if="getPriceModel.price"
          class="font-semibold mb-1"
          style="font-size: 28px;"
        >
          {{ getPriceModel.price }}
        </h2>
        <div 
          v-if="getVolume"
        >
          Pour un volume {{ typeof getVolume === 'string' ? `${getVolume}` : `de ${getVolume} m³` }}
        </div>
      </div>
      <div>
        <p class="font-semibold mb-1">
          Bonne nouvelle!
        </p>
        <span>Vous économisez 30% par rapport à un box de stockage traditionnel<br>de taille équivalente. </span>
      </div>
    </div>
    <div
      class="grid grid-col-1 md:grid-cols-2 gap-5 mx-auto text-gilbert bg-gilbert-light p-4 rounded-lg mb-16 text-base"
    >
      <div>
        <p class="font-semibold mb-1">
          Les + de Gilbert :
        </p>
        <p
          v-for="sent, sentIndex in plus"
          :key="sentIndex"
        >
          {{ sent }}
        </p>
      </div>
      <div>
        <p class="font-semibold">
          Vos affaires en toute sécurité :
        </p>
        <p
          v-for="sent, sentIndex in security"
          :key="sentIndex"
        >
          {{ sent }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import general from '@/mixins/general'

export default {
  mixins: [general],
  data() {
    return {
      plus: ['✔️ GRATUIT : accès illimité à vos affaires', '✔️ SANS engagement de durée', '✔️ PAS de cadenas nécessaire', '✔️ PAS de frais de dossier', '✔️ Prix bloqué'],
      security: [ '🔐 Double périmètre de sécurité','📹 Vidéosurveillance 24h/24','🚨 Détecteur de mouvement','🔥 Système anti-incendie','❄️ Suivi température et humidité 7j/7']
    }
  }
}
</script>