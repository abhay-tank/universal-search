import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import "./App.scss";
import jsonData from "./data/sample-data.json";
class App extends Component {
	state = {
		data: [],
	};
	componentDidMount = () => {
		this.setState((state, props) => ({
			data: JSON.parse(JSON.stringify(jsonData.partners)),
		}));
	};
	fetchResult = (result) => {
		console.log(result);
	};
	render() {
		return (
			<div className="AppContainer">
				<h1>Universal Search</h1>
				{/* Pass data and perform search in Search */}
				<Searchbar
					dataList={this.state.data}
					searchKey="name"
					alignIcon="left"
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
