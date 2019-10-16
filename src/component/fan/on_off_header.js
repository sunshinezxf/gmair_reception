import React from 'react';
import 'antd/dist/antd.css'
import on_off_bg from '../../material/logo/gmair_white.png';
import power_img from '../../material/icon/power.png';
import { Input , Button , List } from 'antd'

const on_off_header = {
    position: `relative`,
    paddingBottom:`2rem`,
    backgroundColor:`white`,
}

const on_off_bg_style = {
    width: `100%`,
    height: `20rem`,
}

const controller_container_style = {
    position: `absolute`,
    bottom: `4rem`,
    right: `3rem`,
    width: `6rem`,
    height: `6rem`,
    padding: `1rem 1.5rem`,
    backgroundColor: `rgb(7, 179, 243)`,
    borderRadius:`3rem`,
    display: `flex`,
    flexWrap: `wrap`,
    boxShadow: `0 0 0.3rem 1rem rgb(7, 179, 243, 0.2)`,
}

const power_icon_container_style = {
    margin: `0 0.4rem 0.3rem 0.4rem`
}

const power_icon_style = {
    width: `100%`,
}

const on_off_text = {
    fontSize: `1rem`,
    textAlign: `center`,
    color: `white`
}

const OnOffHeader = (props)=>{
    return(
        <div style={on_off_header}>
            <img src={on_off_bg} style={on_off_bg_style}></img>
            <div style={controller_container_style}>
                <div style={power_icon_container_style}>
                    <img src={power_img} style={power_icon_style}></img>
                </div>
                <div style={on_off_text}>已开启</div>
            </div>
        </div>
    )
}

export default OnOffHeader;