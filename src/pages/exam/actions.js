/**
 * @author AnnatarHe
 * @email iamhele1994@gmail.com
 * @date 2016.12.07
 */

import {
    FETCHING_PAPER,
    FETCHED_PAPER,
    FETCHED_PAPER_FAIL,
    FETCHED_QUESTION,

    NEXT_QUESTION,
    PREV_QUESTION,
    FINISHED_PAPER,

    PUSHING_SCORE,
    PUSHED_SCORE
} from './constants'
import { push } from 'react-router-redux'

const fetchingPaper = () => {
    return {
        type: FETCHING_PAPER
    }
}

const fetchedPaper = paper => {
    return {
        type: FETCHED_PAPER,
        paper
    }
}

const fetchedQuestions = questions => {
    return {
        type: FETCHED_QUESTION,
        questions
    }
}

const fetchedPaperFail = err => {
    return {
        type: FETCHED_PAPER_FAIL,
        err
    }
}

export const fetchPaper = id => {
    return dispatch => {
        dispatch(fetchingPaper())
        return fetch(`/api/paper/${id}`)
            .then(res => res.json())
            .then(res => res.data)
            .then(paper => {
                const questions = paper.questions.map(q => {
                    q.answers = JSON.parse(q.answers)
                    return q
                })
                delete paper.questions
                dispatch(fetchedPaper(paper))
                dispatch(fetchedQuestions(questions))
            })
            .catch(err => {
                dispatch(fetchedPaperFail(err))
            })
    }
}

export const nextQuestion = current => {
    return { type: NEXT_QUESTION }
}

export const prevQuestion = current => {
    return { type: PREV_QUESTION }
}

// ----------------------------------------- submit paper ------------------------------------

const finishedPaper = () => {
    return {
        type: PUSHED_SCORE
    }
}

export const submitPaperResult = score => {
    return (dispatch, getState) => {

        // 需要获取用户数据，用以传递
        const state = getState()
        const paperID = state.exam.paper.ID
        let fd = new FormData()
        fd.append('score', score)
        return fetch(`/api/user/finished/${paperID}`, {
            method: 'POST',
            body: fd,
            credentials: 'include'
        }).then(res => res.json())
            .then(res => {
                dispatch(finishedPaper())
                dispatch(push(`/exam/${paperID}/finish?score=${score}`))
            })
    }
}


export function addPaper(data) {
    let formData = new FormData()
    Object.keys(data).forEach(item => {
        formData.append(item, data[item])
    })

    return dispatch => {
        // 教师id通过服务端获取
        return fetch('/api/paper/add', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
    }
}
