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
	selectedOption = (result) => {
		console.log("Dropdown selected option: ", result);
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
				<Droplist
					selectedOptionCallback={this.selectedOption}
					dataList={this.state.data}
					displayKey="name"
					// placeHolder="Select Something"
					// multipleSelect={false}
					// searchOptions={{
					// 	enableSearch: true,
					// 	searchKeys: ["name"],
					// 	caseSensitive: false,
					// 	placeholder: "Search",
					// 	alignIcon: "right",
					// }}
				/>
			</div>
		);
	}
}

export default App;
