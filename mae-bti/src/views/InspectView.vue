<template>
  <div class="progress">
    <div class="progress-bar" :style="{ width: (currentIndex + 1) / questionLength * 100 + '%' }"></div>
  </div>
  <div class="white-shadow" style="position: fixed; top: 0;">{{ currentIndex + 1 }}/{{ questionLength }}</div>
  <Question :current-index="currentIndex" :question-length="questionLength" :question-content="questionContent"
    :next-question="nextQuestion" :prev-question="prevQuestion" :response-question="responseQuestion"
    :selected-class="selectedClass" :next-button-blink="nextButtonBlink">
  </Question>
  <RouterLink v-if="resultVisible" class="button-blink" :to="{ name: 'result', query: { job: jobRank[0] } }">결과 보기
  </RouterLink>
  <a v-else v-if="incompleteChecker" class="incomplete button-blink" @click="toIncompleteQuestion">응답하지않은 문항으로 가기</a>
</template>

<style scoped>
.incomplete {
  background-color: var(--primary-red);
}

/* .incomplete-disabled {
  filter: grayscale(100%);
  animation: none;
  color: #999;
  border-color: #999;
}

.incomplete-disabled:hover {
  cursor: default;
} */

.move:hover {
  cursor: pointer;
}

.progress {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 20px;
  background-color: #ddd;
}

.progress-bar {
  position: fixed;
  top: 0;
  height: 20px;
  background-color: var(--primary-blue);
  transition: width 0.5s;
}
</style>

<script>
import Questions from '../assets/Question.json';
import QuestionFragment from '../components/QuestionFragment.vue';
import { extractJobRank } from '@/utils/jobselector.js';

export default {
  props: {
    backimgMoveUp: Function
  },
  components: {
    Question: QuestionFragment
  },
  data() {
    return {
      incompleteChecker: false,
      currentIndex: 0,
      resultVisible: false,
      questionLength: Questions.length,
      storeResponse: [],
      jobRank: []
    }
  },
  created() {
    this.storeResponse = new Array(this.questionLength).fill(undefined);
  },
  watch: {
    storeResponse: {
      handler() {
        if (this.storeResponse.every(response => response !== undefined)) {
          this.responseAll();
          this.jobRank = extractJobRank(this.storeResponse);
        }
        let x = 0;
        for (let i = 0; i < this.questionLength; i++) {
          if (this.storeResponse[i] !== undefined) {
            x++;
          }
        }
        this.backimgMoveUp(x / this.questionLength * 100);
        this.incompleteCheckMethod();
      },
      deep: true
    }
  },
  methods: {
    questionContent() {
      return Questions[this.currentIndex].question;
    },
    nextQuestion() {
      if (this.currentIndex < this.questionLength - 1) {
        this.currentIndex++;
      }
      this.incompleteCheckMethod();
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      this.incompleteCheckMethod();
    },
    responseQuestion(response) {
      this.storeResponse[this.currentIndex] = response;
    },
    selectedClass(index) {
      return this.storeResponse[this.currentIndex] === index ? 'selected' : '';
    },
    responseAll() {
      this.resultVisible = true;
    },
    toIncompleteQuestion() {
      if (this.incompleteChecker) {
        this.currentIndex = this.storeResponse.findIndex(response => response === undefined);
        this.incompleteChecker = false;
      }
    },
    incompleteCheckMethod() {
      if (this.currentIndex > 0) {
        for (let i = 0; i < this.currentIndex; i++) {
          if (this.storeResponse[i] === undefined) {
            this.incompleteChecker = true;
            return;
          }
        }
      }
      if (this.currentIndex < this.questionLength - 1) {
        let undefinedExist = false;
        let responseExist = false;
        for (let i = this.currentIndex + 1; i < this.questionLength; i++) {
          if (this.storeResponse[i] === undefined) {
            undefinedExist = true;
          } else {
            responseExist = true;
          }
        }
        if (undefinedExist && responseExist) {
          this.incompleteChecker = true;
          return;
        }
      }
      this.incompleteChecker = false;
      return;
    },
    nextButtonBlink() {
      //currentResponsedAndIncompleteCheckerFalse
      return (this.storeResponse[this.currentIndex] !== undefined) && (this.incompleteChecker === false) && (this.currentIndex < this.questionLength - 1) ? true : false;
    }
  }
}
</script>