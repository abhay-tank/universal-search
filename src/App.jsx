import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import "./App.scss";
import jsonData from "./data/sample-data.json";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
class App extends Component {
	state = {
		data: [],
	};
	componentDidMount = () => {
		this.setState((state, props) => ({
			data: jsonData.partners,
		}));
	};
	fetchResult = (result) => {
		console.log(result);
	};
	render() {
		return (
			<div className="AppContainer">
				<h1>Universal Search</h1>
				<Searchbar
					dataList={this.state.data}
					searchKeys={["name", "description"]}
					alignIcon="right"
					resultOnSubmit={false}
					resultCallback={this.fetchResult}
					caseSensitive={false}
					className="searchInput"
					autoFocus={true}
					placeholder="Search"
				/>
			</div>
		);
	}
}

export default App;
