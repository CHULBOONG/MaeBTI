import Joblist from '@/assets/Joblist.json'
import Question from '@/assets/Question.json'

let jobScore = new Array(Joblist.length)

// json에 저장된 결과 목록과 일치해야 함
const grade = ['VeryBad', 'Bad', 'Soso', 'Good', 'VeryGood']

// 직업별 점수 초기화
function initJobScore() {
    for (let i = 0; i < jobScore.length; i++) {
        jobScore[i] = 0
    }
}

// 질문의 sortation을 반환 (ex. 'isUtilGood', 'isCoreEasy', ...)
function findSortation(index) {
    return Question[index].sortation
}

// 직업별 점수 계산하여 더함
// 응답한 값과 직업의 값의 차이가 작을수록 점수가 높아짐
function addJobScore(key, value) {
    for (let i = 0; i < Joblist.length; i++) {
        // abs는 절대값을 반환하는 함수
        jobScore[i] = jobScore[i] + 5 - Math.abs(grade.indexOf(Joblist[i][key]) - value);
    }
}

// 점수가 높은 순으로 직업을 정렬
function sortJoblist() {
    // 모든 직업의 이름을 저장한 배열
    let sortedJoblist = []
    for (let i = 0; i < jobScore.length; i++) {
        sortedJoblist.push(Joblist[i].jobname)
    }
    // sort 함수는 오름차순으로 정렬하므로 점수가 높은 순으로 정렬하기 위해 function을 정의하여 사용
    // a와 b는 정렬할 배열의 요소 (ex. '캡틴', '블래스터')
    // return 값이 0보다 작으면 a가 b보다 앞에 오고, 0보다 크면 b가 a보다 앞에 옴
    // 직업명을 기준으로 jobScore의 인덱스를 찾아 점수를 비교하여 정렬 (ex. '블래스터'의 점수가 '캡틴'보다 높으면 return 값이 0보다 큼)
    // 점수가 높은 직업이 앞에 오도록 정렬 (ex. '블래스터', '캡틴')
    sortedJoblist.sort(function (a, b) {
        return jobScore[Joblist.findIndex(job => job.jobname === b)] - jobScore[Joblist.findIndex(job => job.jobname === a)]
    })
    return sortedJoblist
}

// 저장된 응답을 바탕으로 직업의 점수를 계산하고 정렬하여 반환
export function extractJobRank(response) {
    initJobScore()
    for (let i = 0; i < response.length; i++) {
        addJobScore(findSortation(i), response[i]);
    }
    console.log(jobScore);
    return sortJoblist()
}