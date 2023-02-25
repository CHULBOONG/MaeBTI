<template>
    <div class="white-shadow">Question {{ currentIndex + 1 }}.</div>
    <div class="question-content">{{ questionContent() }}</div>
    <div class="button-response" v-for="i in [...Array(5)].map((_, i) => 4 - i)" @click="responseQuestion(i)"
        :class="selectedClass(i)">{{ responseContent[4 - i] }}</div>
    <div class="flex-row-center-center bottom-container">
        <div class="button-bottom" :class="prevDisabled()" @click="prevQuestion">&lt;</div>
        <div class="button-bottom" :class="nextDisabled(), { 'button-bottom-blink': nextButtonBlink() }"
            @click="nextQuestion">&gt;</div>
    </div>
</template>

<style scoped>
.flex-row-center-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.question-content {
    width: 100vw;
    height: 100px;
    background-color: #fff;
    box-shadow: 0px 0px 5px #999;
    text-align: center;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-response {
    width: 80vw;
    max-width: 240px;
    height: 15vw;
    max-height: 50px;
    background-color: #F48D09;
    color: #fff;
    border-radius: 5px;
    margin: 5px;
    border: #fff solid 1px;
    box-shadow: 0px 0px 5px #999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-response:active {
    background-color: var(--primary-blue);
    cursor: pointer;
}

.selected {
    background-color: var(--primary-blue);
    text-shadow: 0px 0px 1px #fff;
}

.bottom-container {
    height: 15vw;
    max-height: 50px;
    margin: 10px;
    box-shadow: 0px 0px 5px #999;
}

.button-bottom {
    width: 40vw;
    max-width: 120px;
    height: 15vw;
    max-height: 50px;
    background-color: #eee;
    text-align: center;
    margin: 0px;
    border: #999 solid 1px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-bottom-disabled {
    color: #666;
    background-color: #999;
}

@media (hover: hover) and (pointer: fine) {
    .button-response:hover {
        border: var(--primary-blue) solid 1px;
        box-shadow: 0px 0px 5px var(--primary-blue);
        cursor: pointer;
    }

    .button-bottom:hover {
        border: #fff solid 1px;
        cursor: pointer;
    }

}

.button-bottom-disabled:hover {
    border: #999 solid 1px;
    cursor: default;
}

.button-bottom-blink {
    animation: background-blink 1s infinite steps(1);
}

@keyframes background-blink {
    0% {
        background-color: #fff;
    }

    50% {
        background-color: #eee;
    }
}

/* @media (hover: none) {
    .button-response:active {
        border: #3b75d2 solid 1px;
        box-shadow: 0px 0px 5px #3b75d2;
        cursor: pointer;
    }

    .button-bottom:active {
        border: #fff solid 1px;
        cursor: pointer;
    }

    .button-bottom-disabled:active {
        border: #999 solid 1px;
        cursor: default;
    }
} */
</style>

<script>
export default {
    props: {
        currentIndex: Number,
        questionLength: Number,
        questionContent: Function,
        nextQuestion: Function,
        prevQuestion: Function,
        responseQuestion: Function,
        selectedClass: Function,
        nextButtonBlink: Function
    },
    data() {
        return {
            responseContent: ['매우 그렇다', '그렇다', '잘 모르겠다', '아니다', '매우 아니다']
        }
    },
    methods: {
        prevDisabled() {
            return this.currentIndex === 0 ? 'button-bottom-disabled' : '';
        },
        nextDisabled() {
            return this.currentIndex === this.questionLength - 1 ? 'button-bottom-disabled' : '';
        }
    }
}
</script>