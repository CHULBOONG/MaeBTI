<template>
  <h1 style="margin-bottom: 0;">M(메)-BTI</h1>
  <h5 style="margin-top: 5px; color: #ddd;">- Maplestory Best Type Indicator -</h5>
  <RouterLink class="button-blink" to="/inspect">내 직업 성향 알아보러 가기</RouterLink>
  <!-- <RouterLink to="/jobs">go to Jobs View</RouterLink> -->
  <div class="backimg-change-container">
    <div class="backimg-change-description">클릭하여 배경을 바꿔보세요 >></div>
    <div class="backimg-change" @click="backimgChange">
      <img src="/imgicon.png" />
    </div>
  </div>
</template>

<style scoped>
.backimg-change-container {
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.backimg-change-description {
  width: 50vw;
  color: #fff;
  font-size: 15px;
  margin-right: 20px;
  padding-bottom: 10px;
  word-break: keep-all;
  text-align: right;
  /* animation: move 1.5s linear infinite; */
}

.backimg-change {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: var(--primary-orange);
  border: #fff 1px solid;
}

.backimg-change img {
  width: 100%;
  height: 100%;
  filter: invert(1);
}

/* PC에서만 hover 효과 적용 */
@media (hover: hover) and (pointer: fine) {
  .backimg-change:hover {
    background-color: var(--primary-yellow)
  }
}
</style>

<script>
export default {
  // App.vue에서 props로 넘겨준 함수를 사용할 수 있음
  props: {
    backimgMoveUp: Function,
    backimgChange: Function,
  },
  created() {
    // MainView가 생성될 때마다 배경의 위치 초기화
    this.backimgMoveUp(0);
  },
}
</script>