import React,{Component} from 'react';
import OnOffHeader from './on_off_header'

class FanContent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <OnOffHeader></OnOffHeader>
            </div>
        )
    }
}

export default FanContent
