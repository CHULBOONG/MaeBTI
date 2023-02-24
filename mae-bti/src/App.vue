<template>
  <RouterView :backimgMoveUp="backimgMoveUp" :backimgChange="backimgChange" />
  <div class="imgcontainer">
    <img class="backimg" :class="backimgMove()" :src="backimgList[currentBackimgIndex]" :style="objectPositionValue"
      alt="eos" />
  </div>
  <div class="dark-overlay"></div>
  <div v-if="block" class="loading">
    loading...
    <div class="loading-spin"></div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Maplestory Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
}

.imgcontainer {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}

.backimg {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  object-fit: cover;
  filter: blur(7px);
  transition: 0.3s;
  opacity: 0.3;
  scale: 1.01;
}

.backimg-move {
  animation: move 10s linear infinite;
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
  z-index: 9999;
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
      backimgList: [
        '/eostower.webp',
        '/pathoftime.webp',
        '/mureung.webp',
      ],
      pubimgList: [
        '/imgicon.png',
        '/mushroombg.png',
      ],
      currentBackimgIndex: 0,
    }
  },
  mounted() {
    window.addEventListener('load', () => { this.block = false });
    this.backimgList.forEach((img) => {
      const image = new Image();
      image.src = img;
    });
    this.pubimgList.forEach((img) => {
      const image = new Image();
      image.src = img;
    });
  },
  methods: {
    backimgMoveUp(percent) {
      this.objectPositionValue = { objectPosition: '0 ' + (100 - percent) + '%' }
    },
    backimgMove() {
      if (this.$route.path === '/') {
        return 'backimg-move'
      } else {
        return ''
      }
    },
    backimgChange() {
      this.currentBackimgIndex = (this.currentBackimgIndex + 1) % this.backimgList.length;
    }
  },
}
</script>