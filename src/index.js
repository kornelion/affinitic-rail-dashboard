
import React from 'react';
import { render } from 'react-dom';

import Dashboard from './components/dashboard';

import './css/style.css';

class App extends React.Component {


	render(){
		return(
			<Dashboard />
		)
	}

}

render(
    <App />,
    document.getElementById('root')
);