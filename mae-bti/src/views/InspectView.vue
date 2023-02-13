<template>
  <h1>Inspect View</h1>
  <Question :current-index="currentIndex" :question-length="questionLength" :question-content="questionContent"
    :next-question="nextQuestion" :prev-question="prevQuestion" :response-question="responseQuestion"
    :selected-class="selectedClass">
  </Question>
  <RouterLink v-if="resultVisible" to="/result">go to Result View</RouterLink>
</template>

<script>
// insert another Vue component here
import Questions from '../assets/Question.json';
import QuestionFragment from '../components/QuestionFragment.vue';

export default {
  components: {
    Question: QuestionFragment
  },
  data() {
    return {
      currentIndex: 0,
      resultVisible: false,
      questionLength: Questions.length,
      storeResponse: []
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
        }
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
    }
  }
}
</script>