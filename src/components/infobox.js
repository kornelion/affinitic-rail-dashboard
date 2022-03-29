import React from 'react';
import parse from 'html-react-parser'

class Infobox extends React.Component{

	render(){

        // creation of lists of cancels and OK trains

        const listCancels = this.props.dataOrigin.filter(info => info.canceled === '1' && info.time <= this.props.actualTime && info.station === this.props.otherStation);
        const listOks = this.props.dataOrigin.filter(info => info.canceled === '0' && (parseInt(info.time)+parseInt(info.delay)) >= this.props.actualTime && (parseInt(info.time)+parseInt(info.delay)) <= this.props.actualTimePlusOne && info.station === this.props.otherStation);
        const listAll = this.props.dataOrigin.filter(info => (parseInt(info.time)+parseInt(info.delay)) >= this.props.actualTime && (parseInt(info.time)+parseInt(info.delay)) <= this.props.actualTimePlusOne && info.station === this.props.otherStation);

        // math the pourcent of availibility

        const pourcentOfAvailibility = Math.round(((listOks.length / listAll.length)*100));

        // set total delay to 0

        let totalDelay = 0;

        // calculation of total delay for "ok" trains

        listOks.map(item => {
            totalDelay = totalDelay + parseInt(item.delay);
        })

        // math the average delay

        const averageDelay = totalDelay / listOks.length;
        const averageDelayMinutes = Math.round(averageDelay / 60);

        // design thing for the title bar of the infoBox

        if (this.props.dataType === "arrival") {
            var textHead = "<strong>"+this.props.otherStation+"</strong> &rarr; <strong>"+this.props.station+"</strong>";
        } else {
            var textHead = "<strong>"+this.props.station+"</strong> &rarr; <strong>"+this.props.otherStation+"</strong>";
        }

		return(
           
            <div className="info-container">
                <span className="title">{parse(textHead)}</span>
                <div className="line">
                    <strong>Availibility</strong> (next hour) : {pourcentOfAvailibility}%
                </div>
                <div className="line">
                    <strong>Average delay</strong> (next hour) : {averageDelay} second(s) or ± {averageDelayMinutes} minute(s)
                </div>
                <div className="line">
                    <strong>Canceled</strong> (last 2 hours): {listCancels.length}
                </div>
            </div>

		)
	}

}
    
export default Infobox;