import React,{Component} from 'react';
import OnOffHeader from './onOffHeader'
import WindController from '../../containers/fan/windController'

class FanContent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <OnOffHeader></OnOffHeader>
                <WindController></WindController>
            </div>
        )
    }
}

export default FanContent;
