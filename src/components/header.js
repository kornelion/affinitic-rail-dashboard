import React from 'react';


class Header extends React.Component{

	render(){
		return(
            <div className="header">
                <p><strong>{this.props.time}</strong></p>
            </div>
		)
	}

}


export default Header;