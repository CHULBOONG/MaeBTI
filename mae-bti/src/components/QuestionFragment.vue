<template>
    <div>Question</div>
    <div class="question-content">{{ questionContent() }}</div>
    <div class="button-response" v-for="i in [...Array(5)].map((_, i) => 2 - i)" @click="responseQuestion(i)"
        :class="selectedClass(i)">{{ responseContent[2 - i] }}</div>
    <div class="flex-row-center-center bottom-container">
        <div class="button-bottom" :class="prevDisabled()" @click="prevQuestion">&lt;</div>
        <div class="button-bottom" :class="nextDisabled()" @click="nextQuestion">&gt;</div>
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
    line-height: 100px;
    margin: 5px;
}

.button-response {
    width: 200px;
    height: 50px;
    background-color: #F48D09;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    margin: 5px;
    border: #fff solid 1px;
    box-shadow: 0px 0px 5px #999;
}

.button-response:active {
    background-color: #3b75d2;
    cursor: pointer;
}

.selected {
    background-color: #3b75d2;
}

.bottom-container {
    height: 50px;
    margin: 10px;
    box-shadow: 0px 0px 5px #999;
}

.button-bottom {
    width: 100px;
    height: 50px;
    background-color: #fff;
    text-align: center;
    line-height: 50px;
    margin: 0px;
    border: #999 solid 1px;
}

.button-bottom-disabled {
    color: #666;
    background-color: #999;
}

@media (hover: hover) {
    .button-response:hover {
        border: #3b75d2 solid 1px;
        box-shadow: 0px 0px 5px #3b75d2;
        cursor: pointer;
    }

    .button-bottom:hover {
        border: #fff solid 1px;
        cursor: pointer;
    }

    .button-bottom-disabled:hover {
        border: #999 solid 1px;
        cursor: default;
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
        selectedClass: Function
    },
    data() {
        return {
            responseContent: ['매우 그렇다', '그렇다', '보통이다', '아니다', '매우 아니다']
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