<template>
  <RouterView :backMove="backMove" />
  <img class="backimg" src="/eostower.png" :style="objectPositionValue" alt="eos" />
  <div class="dark-overlay"></div>
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
</style>

<script>
export default {
  data() {
    return {
      objectPositionValue: { objectPosition: '0 100%' },
    }
  },
  methods: {
    // return style object-position for vue
    backMove(percent) {
      this.objectPositionValue = { objectPosition: '0 ' + (100 - percent) + '%' }
      console.log(this.objectPositionValue);
    }
  },
}
</script>