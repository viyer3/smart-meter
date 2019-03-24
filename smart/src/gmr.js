import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {geolocated} from 'react-geolocated';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyC02JJiLtNy8XKna8HF4fCnLTbZBUYvQzQ'}}
          defaultCenter={{
		  	lat: this.props.isGeolocationAvailable? 
					(this.props.isGeolocationEnabled? 
					 	this.props.coords ? 
							this.props.coords.latitude
							: 59.955413
						: 59.955413) 
					: 59.955413,
			lng: this.props.isGeolocationAvailable? 
					(this.props.isGeolocationEnabled? 
					 	this.props.coords ? 
							this.props.coords.longitude
							: 30.33
						: 30.33) 
					: 30.33,
		  }}
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
