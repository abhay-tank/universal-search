import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import "./App.scss";
import jsonData from "./data/sample-data.json";
import Droplist from "./components/Droplist/Droplist";
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
					resultCallback={this.fetchResult}
					caseSensitive={false}
					className="searchInput"
					autoFocus={true}
					placeholder="Search"
				/>
				<hr />
				<h1>Universal Droplist with Searchbar</h1>
				<Droplist dataList={this.state.data} />
			</div>
		);
	}
}

export default App;
