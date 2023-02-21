import Joblist from '@/assets/Joblist.json'
import Question from '@/assets/Question.json'

let jobScore = new Array(Joblist.length)

const grade = ['VeryBad', 'Bad', 'Soso', 'Good', 'VeryGood']

function initJobScore() {
    for (let i = 0; i < jobScore.length; i++) {
        jobScore[i] = 0
    }
}

function findSortation(index) {
    return Question[index].sortation
}

function addJobScore(key, value) {
    for (let i = 0; i < Joblist.length; i++) {
        jobScore[i] = jobScore[i] + 5 - Math.abs(grade.indexOf(Joblist[i][key]) - value);
    }
}

function sortJoblist() {
    let sortedJoblist = []
    for (let i = 0; i < jobScore.length; i++) {
        sortedJoblist.push(Joblist[i].jobname)
    }
    sortedJoblist.sort(function (a, b) {
        return jobScore[Joblist.findIndex(job => job.jobname === b)] - jobScore[Joblist.findIndex(job => job.jobname === a)]
    })
    return sortedJoblist
}

export function extractJobRank(response) {
    initJobScore()
    for (let i = 0; i < response.length; i++) {
        addJobScore(findSortation(i), response[i]);
    }
    console.log(jobScore);
    return sortJoblist()
}