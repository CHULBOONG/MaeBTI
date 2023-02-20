<template>
  <RouterView :backMove="backMove" :backimgChange="backimgChange" />
  <img class="backimg" :class="backimgMove()" :src="backimgList[currentBackimgIndex]" :style="objectPositionValue"
    alt="eos" />
  <div class="dark-overlay"></div>
  <div v-if="block" class="loading">
    loading...
    <div class="loading-spin"></div>
  </div>
</template>

<style>
@font-face {
  font-family: 'Maplestory Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
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
  animation: move 0.5s linear infinite;
}

@keyframes move {
  0% {
    transform: translateX(-1%);
  }

  50% {
    transform: translateX(1%);
  }

  100% {
    transform: translateX(-1%);
  }
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

html {
  overflow: hidden;
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
      currentBackimgIndex: 0,
    }
  },
  mounted() {
    window.addEventListener('load', () => { this.block = false });
  },
  methods: {
    backMove(percent) {
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