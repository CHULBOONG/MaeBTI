import Joblist from '@/assets/Joblist.json'
import Question from '@/assets/Question.json'

let jobScore = new Array(Joblist.length)

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
        if (Joblist[i][key] === 'yes') {
            jobScore[i] += value;
        }
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