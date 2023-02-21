<template>
    <div class="blinder" @click="closeFragment" ref="blinder">
        <img class="bgimg" src="/mushroombg.png" />
        <div style="z-index: 10;">click anywhere to see result</div>
    </div>
</template>

<style>
.blinder {
    font-size: 30px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: var(--primary-orange);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: blink 1s infinite steps(1);
    background-color: #b7d468;
}

/* blink text shadow with keyframes */
@keyframes blink {
    0% {
        -webkit-text-stroke: #fff 1px;
    }

    50% {
        -webkit-text-stroke: var(--primary-yelow) 1px;
    }

    100% {
        -webkit-text-stroke: #fff 1px;
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
            this.$refs.blinder.style.display = "none";
        }
    },
}
</script>