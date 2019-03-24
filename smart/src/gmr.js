import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {geolocated} from 'react-geolocated';
import point from './map-marker-icon.png';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lng: -77.0486352,
      lat: 38.8996301
    },
    spot1: {
      lng: -77.0474352,
      lat: 38.8998301
    },
    spot2: {
      lng: -77.0488352,
      lat: 38.8996301
    },
	
    zoom: 16
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyC02JJiLtNy8XKna8HF4fCnLTbZBUYvQzQ'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={
					this.props.isGeolocationAvailable? 
							(this.props.isGeolocationEnabled? 
							 	this.props.coords ? 
									this.props.coords.latitude
									: 59.955413
								: 59.955413) 
							: 59.955413
			}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />

		  <AnyReactComponent 
		  	lat={this.props.spot1.lat}
		  	lng={this.props.spot1.lng}
			text={<img src={point} width="32"/>}
		  />
		  
		  <AnyReactComponent 
		  	lat={this.props.spot2.lat}
		  	lng={this.props.spot2.lng}
			text={<img src={point} width="32"/>}
		  />
        </GoogleMapReact>
      </div>
    );
  }
}


export default geolocated({
	positionOptions: {
		enableHighAccuracy: false
	},
	userDecisionTimeout: 5000
})(SimpleMap);
