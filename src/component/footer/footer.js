import React from 'react'

import {Link} from 'react-router-dom'

const footer_area = {
    width: `100%`,
    textAlign: `center`,
    height:`3rem`,
    marginTop: `1.5rem`,
    background: `transparent`
}

const footer_text = {
    color: `#FFFFFF`,
    textDecoration: `underline`
}


class Footer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (<footer style={footer_area}><Link to={this.props.link} style={footer_text}>{this.props.name}</Link></footer>)
    }
}

export default Footer;