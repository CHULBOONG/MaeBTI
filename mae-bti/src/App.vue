<template>
  <RouterView :backMove="backMove" />
  <img class="backimg" src="/eostower.png" :style="objectPositionValue" alt="eos" />
  <div class="dark-overlay"></div>
  <div v-if="block" class="loading">
    loading...
    <div class="loading-spin"></div>
  </div>
</template>

<style>
@font-face {
  font-family: 'Maplestory Bold';
  src: url('/Maplestory\ Bold.ttf') format('truetype');
}

/* .backimg should blur, bottom end of image locate in bottom of screen */
.backimg {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  object-fit: cover;
  filter: blur(7px);
  transition: 0.3s;
  opacity: 0.3;
}

.dark-overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  background-color: #000;
}

.loading {
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #000;
  font-size: 20px;
  font-family: sans-serif;
  z-index: 1;
}

.loading-spin {
  position: absolute;
  width: 100px;
  height: 100px;
  border-left: 20px solid #F48D09;
  border-bottom: 20px solid #F7AF52;
  border-right: 20px solid #FAD19C;
  border-top: 20px solid #FDF3E6;
  border-radius: 50%;
  z-index: 2;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
export default {
  data() {
    return {
      objectPositionValue: { objectPosition: '0 100%' },
      block: true,
    }
  },
  mounted() {
    window.addEventListener('load', () => {this.block = false});
  },
  methods: {
    backMove(percent) {
      this.objectPositionValue = { objectPosition: '0 ' + (100 - percent) + '%' }
      console.log(this.objectPositionValue);
    }
  },
}
</script>