import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import PropTypes from "prop-types";
import styles from "./Droplist.module.scss";
export class Droplist extends Component {
	static propTypes = {
		dataList: PropTypes.arrayOf(Object),
		selectedOptionCallback: PropTypes.func,
	};
	state = {
		dataList: [],
		selectedOption: "",
	};
	componentDidMount = () => {
		this.setState((state, props) => ({ dataList: this.props.dataList }));
		console.log("Data mounted");
	};
	getSearchResult = (result) => {
		if (result.length)
			this.setState((state, props) => ({ dataList: [...result] }));
		else this.setState((state, props) => ({ dataList: this.props.dataList }));
	};

	resultCallback = (option) => {
		this.setState((state, props) => ({
			selectedOption: option[this.props.displayKey],
		}));
		this.props.selectedOptionCallback(option);
	};

	render() {
		console.log(this.state);
		return (
			<div tabIndex="0" className={styles["droplistSelectDiv"]}>
				<button className={styles["droplistSelectButton"]}>
					{this.state.selectedOption.length
						? this.state.selectedOption
						: "Select"}
				</button>
				<div className={styles["droplistOptions"]}>
					<Searchbar
						dataList={this.props.dataList}
						searchKeys={["name", "description"]}
						resultCallback={this.getSearchResult}
					/>
					{this.state.dataList.map((option) => {
						return (
							<button
								onClick={() => {
									this.resultCallback(option);
								}}
								id={option.uid}
								key={option.uid}
								className={styles["option"]}
							>
								{option[this.props.displayKey]}
							</button>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Droplist;
