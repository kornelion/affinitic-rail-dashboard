import React from 'react';
import axios from 'axios';

import Header from './header';
import Infobox from './infobox';

export default class Dashboard extends React.Component {

    // init states and props
    // station name and id are stored here to ease the update if we want to check another station

    constructor(props) {
        super(props);
        this.stationName = "Nivelles";
        this.getTime = this.getTime.bind(this);
        this.getData = this.getData.bind(this);
        this.refreshData = this.refreshData.bind(this);
        
        var dx = new Date();

        let hour = (dx.getHours() - 2);
        hour = ('0' + hour).slice(-2);
        let minute = dx.getMinutes();
        minute = ('0' + minute).slice(-2);
  
        const time = `${hour}${minute}`;

        this.state = {
            arrival: [],
            departure: [],
            TimeMinusTwo: time
        }
    }

    // on startup, get init data and launch interval

    componentDidMount() {

        this.getTime();
        this.getData();

        this.interval = setInterval(() => this.refreshData(), 1000);
    }

    // on close, we kill the interval

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // getData function to call twice with AXIOS the iRail API with 2 different urls and place on state the result
    
    async getData(){
        const [arrivalArray, departureArray] = await Promise.all([
            axios.get('https://api.irail.be/liveboard/?station='+this.stationName+'&format=json&lang=fr&arrdep=arrival&alerts=true&time='+this.state.TimeMinusTwo),
            axios.get('https://api.irail.be/liveboard/?station='+this.stationName+'&format=json&lang=fr&arrdep=departure&alerts=true&time'+this.state.TimeMinusTwo),
        ]);

        this.setState({
            arrival: arrivalArray.data.arrivals.arrival,
            departure: departureArray.data.departures.departure,
        });
    }

    // getTime function to have the actual time, the actual time formated for display matters, the actual time +1 and the actual time -2


    getTime(){
        var dt = new Date();
        var dx = new Date();
        var de = new Date().toLocaleString();

        let hour = (dx.getHours() - 2);
        hour = ('0' + hour).slice(-2);
        let minute = dx.getMinutes();
        minute = ('0' + minute).slice(-2);
  
        const time = `${hour}${minute}`;

        this.setState({
            actualTimeFormated: de,
            actualTime: Math.floor(new Date().getTime() / 1000),
            TimePlusOne: Math.floor(new Date().setHours(dt.getHours() + 1) / 1000),
            TimeMinusTwo: time    
        });
    }

    // refreshDate function to trigger the two others

    refreshData(){
        this.getData();
        this.getTime();
    }

    // we specify the other station and other informations for flexibility matter. It allow us to change tracked station without altering the filter.
    // it also allow to place several other Infoboxes with different stations to track.

    render() {

        return (
            <div className="wrapper">

                <Header time={this.state.actualTimeFormated}/>

                <div className='container'>

                    <Infobox dataOrigin={this.state.arrival} dataType="arrival" station={this.stationName} otherStation="Charleroi-Sud" actualTime={this.state.actualTime} actualTimePlusOne={this.state.TimePlusOne} />
                    
                    <Infobox dataOrigin={this.state.departure} dataType="departure" station={this.stationName} otherStation="Charleroi-Sud" actualTime={this.state.actualTime} actualTimePlusOne={this.state.TimePlusOne} />

                </div>
                
            </div>
        )
    }
}