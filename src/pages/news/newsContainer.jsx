/**
 * @author AnnatarHe
 * @email iamhele1994@gmail.com
 * @date 2017.01.29
 */

import React from 'react'
import changeTitleHOC from '../../components/HOC/changeTitle'
import styles from './news.css'

@changeTitleHOC(true)
class NewsContainer extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.changeTitle('新闻列表')
    }

    render() {
        return (
            <section className={styles.newsContainer}>
                { this.props.children }
            </section>
        )
    }
}

export default NewsContainer

