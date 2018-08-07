import React from 'react'
import {Col, Form, FormControl, FormGroup} from 'react-bootstrap'
import {locationservice} from "../service/location.service";
import {airquality_service} from "../service/airquality.service";

const outdoor_area = {
    height: `3rem`
}

const location_item = {
    float: `left`,
    width: `50%`
}

// dist picker
export class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {province: [], city: [], district: [], showDistrict: true};
        this.provinceChange = this.provinceChange.bind(this);
        this.cityChange = this.cityChange.bind(this);
    }

    componentDidMount() {
        locationservice.list_province().then(response => {
            this.setState({
                province: response.data
            });
        })
    }

    provinceChange() {
        let provinceId = document.getElementById('province').value;
        locationservice.list_city(provinceId).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({
                    city: response.data,
                })

            } else {
                this.setState({
                    city: [],
                    district: []
                })
            }
        })
    }

    cityChange() {
        let cityId = document.getElementById('city').value;
        airquality_service.config_default_outdoor(this.props.qrcode, cityId).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.props.refresh_city(cityId);
            }
        })
    }


    render() {
        return (
            <div style={outdoor_area}>
                <FormGroup style={{marginBottom: `0`}}>
                    <FormControl componentClass='select' id='province' onChange={this.provinceChange}
                                 style={location_item}>
                        <option data-code data-text='—— 省 ——' value=''>请选择省(直辖市)</option>
                        {
                            this.state.province.map(e => {
                                return <option key={e.provinceId} value={e.provinceId}>{e.provinceName}</option>
                            })
                        }
                    </FormControl>
                </FormGroup>
                <FormGroup style={{marginBottom: `0`}}>
                    <FormControl componentClass='select' id='city' onChange={this.cityChange} style={location_item}>
                        <option data-code data-text='—— 市 ——' value=''>请选择市(区)</option>
                        {
                            this.state.city.map(e => {
                                return <option key={e.cityId} value={e.cityId}>{e.cityName}</option>
                            })
                        }
                    </FormControl>
                </FormGroup>
            </div>
        )
    }
}


export default Location