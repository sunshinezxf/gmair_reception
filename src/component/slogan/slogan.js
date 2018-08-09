import React from 'react'

import ReactRevealText from 'react-reveal-text'

class Slogan extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showtext: true
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({showtext: !this.state.showtext});
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
           return <ReactRevealText className='gmair_logo_slogan' show={this.state.showtext}>简单实现好空气</ReactRevealText>
    }
}

export default Slogan;