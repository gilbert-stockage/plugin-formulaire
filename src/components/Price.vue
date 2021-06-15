<template>
  <div class="Price px-2 lg:px-0 text-base">
    <div class="Stepper-Price-Card flex flex-col justify-start relative border-gilbert rounded-md p-4 text-center mb-8 text-gilbert prix-mobile">
      <div class="mx-auto mb-4">
        <img
          :src="getImageSrc(getPriceModel.imageSrc)"
          alt="tarif"
          style="max-width: 350px;"
        >
      </div>
      <div
        class=""
      >
        <h2 
          v-if="getPriceModel.price"
          class="font-semibold"
          style="font-size: 28px;color:#18404B;"
        >
          {{ getPriceModel.price }}
        </h2>
        <div 
          v-if="getVolume"
          style="color:#18404B;"
        >
          Pour un volume {{ typeof getVolume === 'string' ? `${getVolume}` : `de ${getVolume} m³` }}
        </div><br>
      </div>
      <div>
        <p class="font-semibold" style="color:#18404B;">
          Bonne nouvelle!
        </p>
        <span style="color:#18404B;">Vous économisez 30% par rapport à un box de stockage traditionnel<br>de taille équivalente. </span>
      </div>
    </div>
    <div
      class="grid grid-col-1 md:grid-cols-2 gap-5 mx-auto text-gilbert bg-gilbert-light p-4 rounded-lg mb-16 text-base"
    >
      <div>
        <p class="font-semibold mb-1" style="color:#18404B;">
          Les + de Gilbert :
        </p>
        <p
          v-for="sent, sentIndex in plus"
          :key="sentIndex"
          style="color:#18404B;"
        >
          {{ sent }}
        </p>
      </div>
      <div>
        <p class="font-semibold mb-1" style="color:#18404B;">
          Vos affaires en toute sécurité :
        </p>
        <p
          v-for="sent, sentIndex in security"
          :key="sentIndex"
          style="color:#18404B;"
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