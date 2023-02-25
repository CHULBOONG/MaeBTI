<template>
    <div class="blinder" @click="closeFragment" ref="blinder">
        <img class="bgimg" src="/mushroombg.png" ref="blinderImg"/>
        <div style="z-index: 10; text-align: center; word-break: keep-all;" ref="blinderText">결과를 보려면 아무데나 누르세요</div>
    </div>
</template>

<style scoped>
.blinder {
    font-size: 30px;
    position: fixed;
    width: 100vw;
    height: 100vh;
    color: var(--primary-orange);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: blink 1s infinite steps(1);
    background-color: #b7d468;
    z-index: 100;
    transition: 0.5s ease-in-out;
}

/* blink text shadow with keyframes */
@keyframes blink {
    0% {
        -webkit-text-stroke: #fff 1px;
    }
    50% {
        -webkit-text-stroke: var(--primary-yelow) 1px;
    }
}

.blinder img{
    position: absolute;
    left: 0;
    height: 100vh;
    object-fit: scale-down;
}

.blinder:hover {
    cursor: pointer;
}
</style>

<script>
// click to close the fragment
export default {
    methods: {
        closeFragment() {
            this.$refs.blinderImg.style.display = "none";
            this.$refs.blinderText.style.display = "none";
            this.$refs.blinder.style.width = "0";
            this.$refs.blinder.style.height = "0";
            this.$refs.blinder.style.opacity = "0";
        }
    },
}
</script>