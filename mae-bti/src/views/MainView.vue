<template>
  <h1>Main View</h1>
  <RouterLink to="/inspect">go to Inspect View</RouterLink>
  <RouterLink to="/jobs">go to Jobs View</RouterLink>
  <div class="backimg-change" @click="backimgChange">
    <img src="imgicon.png" />
  </div>
</template>

<style>
.backimg-change {
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  z-index: 2;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.backimg-change img {
  width: 100%;
  height: 100%;
  filter: opacity(90%);
}

@media (hover: hover) and (pointer: fine) {
  .backimg-change:hover {
    background-color: var(--primary-orange)
  }
}
</style>

<script>
export default {
  props: {
    backMove: Function,
    backimgChange: Function,
  },
  created() {
    this.backMove(0);
  },
}
</script>