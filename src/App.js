import React, { Component } from 'react';
import SideBar from '../src/sbcomponents/SideBar';
import './App.css';
// eslint-disable-next-line
import SquareAPI from "./API/";
// eslint-disable-next-line
import axios from 'axios';

class App extends Component {

  state = {
    venues:[]
  }
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOPen = true;
    this.setState({ markers: Object.assign(this.state.markers)});
    // eslint-disable-next-line
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res =>{
      const  newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues:Object.assign(this.state.venues,newVenue) });
    });
};
handleListIemClick = venue => {
  // eslint-disable-next-line
 const marker = this.state.markers.find(marker => marker.id === venue.id);
this.handleMarkerClick(marker);
}
  componentDidMount() {
    this.getVenues()
    
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAre0HP506akJ5Aeck1LOyjwoSNVxSeAv4&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    // eslint-disable-next-line
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    // eslint-disable-next-line
    const parameters = {
      client_id: "3ZYCIAMLNJ0RVS4HJ4RDUGEPNJHIBJRII1DGQNOFFMCBDXC3",
      client_secret: "KI5FRQJEZVT03ES25MZNJSPG2EWIOMRQ0VQTRZBJMQYA5N2W",
      query: "food",
      near: "sydney",
      limit: 10,
      v: "20181101"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
          }, this.renderMap())
        
        
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })
      
  }

 initMap = () => {
   // eslint-disable-next-line
      var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        })
        // eslint-disable-next-line
        var infowindow = new window.google.maps.InfoWindow()
        // eslint-disable-next-line
        this.state.venues.map(myVenue => {
        // eslint-disable-next-line
          var contentString = `${myVenue.venue.name}`
         // eslint-disable-next-line
      

          

       
       
        // eslint-disable-next-line
        var marker = new window.google.maps.Marker({
    position: {lat: myVenue.venue.location.lat, lng: 
      myVenue.venue.location.lng},
    map: map,
    title: myVenue.venue.name
    
        })
        // eslint-disable-next-line
       

        marker.addListener('click', function() {
          infowindow.setContent(contentString)
    infowindow.open(map, marker);
  });


  })
}
      

  render() {
    return (
     <main>
       <SideBar 
       {...this.state} handleListItemClick={this.handleListItemClick}/>
      <div id="map">
        
        </div> 
        
      </main>
    );
  }
}
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}


export default App;
