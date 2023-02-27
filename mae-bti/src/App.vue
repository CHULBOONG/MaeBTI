<template>
  <RouterView :backimgMoveUp="backimgMoveUp" :backimgChange="backimgChange" />
  <div class="imgcontainer">
    <img class="backimg" :class="backimgMove()" :src="backimgList[currentBackimgIndex]" :style="objectPositionValue"
      alt="eos" />
  </div>
  <div class="dark-overlay"></div>
  <div v-if="block" style="opacity: 1;" class="loading">
    loading...
    <div class="loadingio-spinner-eclipse-vy6k4to2bf">
      <div class="ldio-b7g6avxl4hq">
        <div></div>
      </div>
    </div>
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
</style>

<script>
export default {
  data() {
    return {
      // 2d 오브젝트의 위치를 조절하는 스타일 객체
      objectPositionValue: { objectPosition: '0 100%' },
      // 로딩창 블록 여부
      block: true,
      // 배경 이미지 리스트
      backimgList: [
        '/eostower.webp',
        '/pathoftime.webp',
        '/mureung.webp',
      ],
      // 배경을 제외한 이미지 리스트
      pubimgList: [
        '/imgicon.png',
        '/mushroombg.png',
      ],
      // 현재 배경 이미지 인덱스
      currentBackimgIndex: 0,
    }
  },
  mounted() {
    // 이미지 로딩 완료 후 로딩창 블록 해제
    window.addEventListener('load', () => { this.block = false });
    // 이미지 미리 로딩
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
    // 2d 오브젝트의 상하 움직임을 조절하는 메소드
    backimgMoveUp(percent) {
      this.objectPositionValue = { objectPosition: '0 ' + (100 - percent) + '%' }
    },
    // 배경 이미지의 좌우 움직임을 조절하는 메소드
    backimgMove() {
      if (this.$route.path === '/') {
        return 'backimg-move'
      } else {
        return ''
      }
    },
    // 배경 이미지를 변경하는 메소드
    backimgChange() {
      this.currentBackimgIndex = (this.currentBackimgIndex + 1) % this.backimgList.length;
    }
  },
}
</script>