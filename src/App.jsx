import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import "./App.scss";
import jsonData from "./data/sample-data.json";
class App extends Component {
	state = {
		data: [],
	};
	onChange = (event, caseSensitive) => {
		if (event.target.value.length) {
			const resultList = this.state.data.filter((partners) => {
				if (caseSensitive) {
					return partners.name.includes(event.target.value);
				} else {
					return partners.name
						.toLowerCase()
						.includes(event.target.value.toLowerCase());
				}
			});
			console.log(resultList);
		}
	};
	componentDidMount = () => {
		this.setState((state, props) => ({
			data: JSON.parse(JSON.stringify(jsonData.partners)),
		}));
	};
	render() {
		return (
			<div className="AppContainer">
				<h1>Universal Search</h1>
				{/* Pass data and perform search in Search */}
				<Searchbar
					caseSensitive={true}
					onChange={this.onChange}
					className="searchInput"
					autoFocus={true}
					placeholder="Search"
				/>
			</div>
		);
	}
}

export default App;
