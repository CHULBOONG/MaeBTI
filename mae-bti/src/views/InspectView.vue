<template>
  <div class="progress">
    <div class="progress-bar" :style="{ width: (currentIndex + 1) / questionLength * 100 + '%' }"></div>
  </div>
  <div class="white-shadow" style="position: fixed; top: 0;">{{ currentIndex + 1 }}/{{ questionLength }}</div>
  <Question :current-index="currentIndex" :question-length="questionLength" :question-content="questionContent"
    :next-question="nextQuestion" :prev-question="prevQuestion" :response-question="responseQuestion"
    :selected-class="selectedClass" :next-button-blink="nextButtonBlink">
  </Question>
  <RouterLink v-if="resultVisible" @click="resultLoading=false" class="button-blink" :to="{ name: 'result', query: { job: jobRank[0] } }">결과 보기
  </RouterLink>
  <a v-else v-if="incompleteChecker" class="incomplete button-blink" @click="toIncompleteQuestion"
    ref="incompleteButton">응답하지않은 문항으로 가기</a>
  <div v-if="resultLoading" class="loading">
    <div class="loadingio-spinner-eclipse-vy6k4to2bf">
      <div class="ldio-b7g6avxl4hq">
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.incomplete {
  background-color: var(--primary-red);
  transition: 0.1s;
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
      // 응답하지 않은 문항으로 가기 버튼의 활성화 여부를 결정하는 변수
      incompleteChecker: false,
      // 결과 페이지로 이동할 수 있는지 확인하는 변수
      resultVisible: false,
      // currentIndex와 questionLength는 QuestionFragment에서 사용하기 위해 props로 전달
      // 현재 질문의 index
      currentIndex: 0,
      // 질문의 총 개수
      questionLength: Questions.length,
      // 응답한 문항의 값이 저장되는 배열
      // 질문 개수만큼 undefined로 초기화
      // 응답한 문항의 index는 해당 index의 값이 undefined가 아닌 값으로 변경됨 (0, 1, 2, 3, 4)
      storeResponse: [],
      // 직업군 추천 결과를 저장하는 배열
      // 모든 직업에 대해 순위를 매겨서 저장
      jobRank: [],
      // 결과 페이지로 이동하기 전 로딩 화면을 보여주기 위한 변수
      resultLoading: false
    }
  },
  created() {
    // 질문 개수만큼 undefined로 초기화
    this.storeResponse = new Array(this.questionLength).fill(undefined);
  },
  watch: {
    // 응답한 문항의 값이 변경될 때마다 실행되는 메소드
    storeResponse: {
      // deep 옵션을 true로 설정하여 객체 내부의 값이 변경될 때도 실행되도록 함
      handler() {
        // 모든 문항에 응답했을 때 실행되는 메소드
        if (this.storeResponse.every(response => response !== undefined)) {
          this.responseAll();
          this.jobRank = extractJobRank(this.storeResponse);
        }
        // 응답한 문항의 개수를 세는 변수
        let x = 0;
        for (let i = 0; i < this.questionLength; i++) {
          if (this.storeResponse[i] !== undefined) {
            x++;
          }
        }
        // 응답한 문항의 개수에 따라 배경 이미지의 위치를 변경
        this.backimgMoveUp(x / this.questionLength * 100);
        // 응답하지 않은 문항으로 가기 버튼의 활성화 여부를 결정하는 메소드
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
    // 모든 문항에 응답했을 때 실행되는 메소드
    responseAll() {
      // 결과 페이지로 이동할 수 있도록 변수를 true로 변경
      this.resultVisible = true;
    },
    // 응답하지 않은 문항으로 가기 버튼을 눌렀을 때 실행되는 메소드
    toIncompleteQuestion() {
      // 현재 인덱스를 임시로 저장
      let temp = this.currentIndex;
      // 현재 인덱스를 응답하지 않은 문항의 인덱스로 변경
      this.currentIndex = this.storeResponse.findIndex(response => response === undefined);
      this.incompleteCheckMethod();
      // 현재 인덱스가 임시로 저장한 인덱스와 같다면 (이동하지 않았다면) 버튼을 흔들어줌
      if (temp === this.currentIndex) {
        const values = ['5px', '25px', '-15px', '25px', '-15px', '5px'];
        for (let i = 0; i < values.length; i++) {
          setTimeout(() => {
            this.$refs.incompleteButton.style.marginLeft = values[i];
          }, (i + 1) * 50);
        }
      }
    },
    // 응답하지 않은 문항으로 가기 버튼의 활성화 여부를 결정하는 메소드
    incompleteCheckMethod() {
      // 현재 인덱스가 0보다 크고, 현재 인덱스보다 작은 인덱스에 undefined가 존재하면 incompleteChecker를 true로 변경
      if (this.currentIndex > 0) {
        for (let i = 0; i < this.currentIndex; i++) {
          if (this.storeResponse[i] === undefined) {
            this.incompleteChecker = true;
            return;
          }
        }
      }
      // 현재 인덱스가 마지막 인덱스보다 작고, 현재 인덱스보다 큰 인덱스에 undefined와 응답이 존재하면 incompleteChecker를 true로 변경
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
      // 위의 조건에 해당하지 않으면 incompleteChecker를 false로 변경
      this.incompleteChecker = false;
      return;
    },
    nextButtonBlink() {
      // 현재 인덱스에 응답이 존재하고, 응답하지 않은 문항으로 가기 버튼이 활성화되어있지 않고, 현재 인덱스가 마지막 인덱스보다 작고, 결과 페이지로 이동할 수 없으면 true를 반환
      return (this.storeResponse[this.currentIndex] !== undefined) && (this.incompleteChecker === false) && (this.currentIndex < this.questionLength - 1) && (this.resultVisible === false) ? true : false;
    }
  }
}
</script>