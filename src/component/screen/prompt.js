import React from 'react'

import {Alert, Button} from 'react-bootstrap'

class ScreenPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.state = {
            show: true
        };
    }

    handleDismiss() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {
        if (this.state.show) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <span><i className='fa fa-bell-o'></i></span>滤网更换提醒
                </Alert>
            );
        }
        return <Button onClick={this.handleShow}>Show Alert</Button>;
    }
}

export default ScreenPrompt;