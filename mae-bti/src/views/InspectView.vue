<template>
  <div class="progress">
    <div class="progress-bar" :style="{ width: (currentIndex + 1) / questionLength * 100 + '%' }"></div>
  </div>
  <div class="white-shadow" style="position: fixed; top: 0;">{{ currentIndex + 1 }}/{{ questionLength }}</div>
  <Question :current-index="currentIndex" :question-length="questionLength" :question-content="questionContent"
    :next-question="nextQuestion" :prev-question="prevQuestion" :response-question="responseQuestion"
    :selected-class="selectedClass">
  </Question>
  <RouterLink v-if="resultVisible" :to="{ name: 'result', query: { job: jobRank[0] } }">go to Result View</RouterLink>
  <div v-else class="blink">Please answer all questions
    <div class="move" @click="toIncompleteQuestion">Move to incomplete question
    </div>
  </div>
</template>

<style>
.blink {
  font-size: 20px;
  color: var(--primary-red);
}

.move {
  text-decoration: underline;
}

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
    backMove: Function
  },
  components: {
    Question: QuestionFragment
  },
  data() {
    return {
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
        this.backMove(x / this.questionLength * 100);
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
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
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
      this.currentIndex = this.storeResponse.findIndex(response => response === undefined);
    }
  }
}
</script>