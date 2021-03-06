/**
 * @author AnnatarHe
 * @email iamhele1994@gmail.com
 * @date 2016.12.08
 */

import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'

import {
    nextQuestion,
    prevQuestion,
    submitPaperResult
} from './actions'

import Question from '../../components/question/question'
import styles from './examing.css'

@connect(store => ({
    current: store.exam.current,
    questions: store.exam.questions
}))
class Examing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scores: []
        }
    }

    componentDidMount() {
        document.addEventListener('visibilitychange', this.outThere)
    }

    outThere = e => {
        if (document.visibilityState === 'hidden') {
            message.warning('请不要再跳出了哦')
        }
    }

    componentWillUnmont() {
        document.removeEventListener('visibilitychange', this.outThere)
    }

    // 得到的是成绩哦，不是选项
    getScore = score => {
        let scores = this.state.scores
        scores[this.props.current] = score
        this.setState({ scores: scores })
    }

    prev = e => {
        this.props.dispatch(prevQuestion(this.props.current))
    }
    next = e => {
        this.props.dispatch(nextQuestion(this.props.current))
    }

    submit = () => {
        const sum = this.state.scores.reduce((cur, nex) => cur + nex)
        this.props.dispatch(submitPaperResult(sum))
        // this.props.dispatch(submitPaperResult(sum))
    }

    nextRender() {
        return this.props.current >= this.props.questions.length - 1 ? (
            <button
                onClick={ this.submit }
                className="btn btn-lg btn-radius btn-red btn-center"
                disabled={this.state.scores[this.props.current] === undefined}
            >提交&nbsp;&nbsp;&nbsp;<i className="fa fa-hand-o-right fa-lg"></i></button>
        ) : (
            <button
                onClick={ this.next }
                className="btn btn-lg btn-radius btn-blue"
                disabled={this.state.scores[this.props.current] === undefined}
            >下一题</button>
        )
    }

    render() {
        return (
            <section className={ styles.container } >
                <Question
                    question={ this.props.questions[this.props.current] }
                    getScore={ this.getScore }
                />
                <div className={ styles.nav }>
                    <button
                        onClick={ this.prev }
                        className="btn btn-lg btn-radius btn-blue"
                        disabled={this.props.current <= 0}
                    >上一题</button>
                    { this.nextRender() }
                </div>
            </section>
        )
    }
}

export default Examing

