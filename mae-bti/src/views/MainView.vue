<template>
  <h1>Main View</h1>
  <RouterLink class="button-blink" to="/inspect">내 직업 성향 알아보러 가기</RouterLink>
  <RouterLink to="/jobs">go to Jobs View</RouterLink>
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

@media (hover: hover) and (pointer: fine) {
  .backimg-change:hover {
    background-color: var(--primary-yellow)
  }
}
</style>

<script>
export default {
  props: {
    backimgMoveUp: Function,
    backimgChange: Function,
  },
  created() {
    this.backimgMoveUp(0);
  },
}
</script>