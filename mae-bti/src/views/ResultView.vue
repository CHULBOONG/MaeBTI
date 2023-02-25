<template>
    <BeforeResult></BeforeResult>
    <h1>당신에게 추천하는 직업은</h1>
    <div class="white-shadow">{{ getJobAlias() }}</div>
    <div class="white-shadow" style="font-size: 20px;">{{ $route.query.job }}</div>
    <div class="image-area">
        <img :src="'/job_illust/' + $route.query.job + '.png'" />
    </div>
    <div class="white-shadow">ㅤ</div>
    <!-- <div class="white-shadow" style="text-align: center;">{{ getJobProperty() }}</div> -->
    <RouterLink to="/">메인으로가기</RouterLink>
    <!-- <RouterLink to="/jobs">go to Jobs View</RouterLink> -->
    <!-- kakaotalk sharing button -->
    <a style="background-color: #F7E600; color: #3A1D1D;" id="kakao-link-btn">카카오톡 공유하기</a>
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
import Alias from '../assets/Alias.json';
import Joblist from '../assets/Joblist.json';
import BeforeResultFragment from '../components/BeforeResultFragment.vue';
import ResultDetailFragment from '../components/ResultDetailFragment.vue';

export default {
    components: {
        BeforeResult: BeforeResultFragment,
        ResultDetail: ResultDetailFragment,
    },
    mounted() {
        // kakao sharing button after dom loaded
        Kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: this.getJobAlias() + ' ' + this.$route.query.job,
                description: '나에게 가장 잘 맞는 직업은 무엇일까?',
                imageUrl: 'https://mae-bti.netlify.app/job_illust_/' + this.$route.query.job + '.png',
                link: {
                    mobileWebUrl: 'https://mae-bti.netlify.app/',
                    webUrl: 'https://mae-bti.netlify.app/',
                },
            },
            buttons: [
                {
                    title: '테스트하러 가기',
                    link: {
                        mobileWebUrl: 'https://mae-bti.netlify.app/',
                        webUrl: 'https://mae-bti.netlify.app/',
                    },
                },
            ],
        });
    },
    methods: {
        getJobProperty() {
            for (let i = 0; i < Joblist.length; i++) {
                if (Joblist[i].jobname === this.$route.query.job) {
                    return Joblist[i];
                }
            }
        },
        getJobAlias() {
            for (let i = 0; i < Alias.length; i++) {
                if (Alias[i].jobname === this.$route.query.job) {
                    return Alias[i].alias;
                }
            }
        }
    },
}
</script>