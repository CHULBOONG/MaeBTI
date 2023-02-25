<template>
    <BeforeResult></BeforeResult>
    <h1>당신의 추천 직업은...</h1>
    <div class="white-shadow">Result Area</div>
    <div class="white-shadow">{{ $route.query.job }}</div>
    <div class="image-area">
        <img :src="'/job_illust/' + $route.query.job + '.png'" />
    </div>
    <div class="white-shadow">Text Area(deprecated)</div>
    <!-- <div class="white-shadow" style="text-align: center;">{{ getJobProperty() }}</div> -->
    <RouterLink to="/">메인으로가기</RouterLink>
    <RouterLink to="/jobs">go to Jobs View</RouterLink>
    <ResultDetail></ResultDetail>
</template>

<style scoped>
.image-area {
    width: 100vw;
    height: 40vh;
    max-height: 300px;
    padding: 20px 0 20px 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 30%), rgba(255, 255, 255, 90%), rgba(0, 0, 0, 30%));
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-area img {
    width: 95%;
    height: 95%;
    object-fit: scale-down;
    /* png image shadow */
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
}
</style>

<script>
import Joblist from '../assets/Joblist.json';
import BeforeResultFragment from '../components/BeforeResultFragment.vue';
import ResultDetailFragment from '../components/ResultDetailFragment.vue';

export default {
    components: {
        BeforeResult: BeforeResultFragment,
        ResultDetail: ResultDetailFragment,
    },
    methods: {
        getJobProperty() {
            for (let i = 0; i < Joblist.length; i++) {
                if (Joblist[i].jobname === this.$route.query.job) {
                    return Joblist[i];
                }
            }
        }
    },
}
</script>