<template>
    <BeforeResult></BeforeResult>
    <h1>Result View</h1>
    <div class="white-shadow">Result Area</div>
    <div class="white-shadow">{{ $route.query.job }}</div>
    <div class="image-area">이미지 영역</div>
    <div class="white-shadow">텍스트 영역</div>
    <div class="white-shadow" style="text-align: center;">{{ getJobProperty() }}</div>
    <RouterLink to="/">go to Main View</RouterLink>
    <RouterLink to="/jobs">go to Jobs View</RouterLink>
</template>

<style>
.image-area{
    width: 200px;
    height: 200px;
    background-color: #fff;
    box-shadow: 0px 0px 5px #999;
    text-align: center;
    margin: 5px;
}
</style>

<script>
import Joblist from '../assets/Joblist.json';
import BeforeResultFragment from '../components/BeforeResultFragment.vue';

export default {
    components: {
        BeforeResult: BeforeResultFragment
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