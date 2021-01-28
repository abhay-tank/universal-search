import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Droplist.module.scss";
import Searchbar from "../Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
export class Droplist extends Component {
	static propTypes = {
		dataList: PropTypes.arrayOf(Object).isRequired,
		selectedOptionCallback: PropTypes.func.isRequired,
		displayKey: PropTypes.string.isRequired,
		searchOptions: PropTypes.object,
	};
	state = {
		dataList: [],
		selectedOption: "",
	};

	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (!prevState.dataList.length) {
			return {
				dataList: nextProps.dataList,
			};
		} else {
			return {
				dataList: prevState.dataList,
			};
		}
	};

	searchResultCallback = (result) => {
		this.setState({ dataList: [...result] });
	};

	resultCallback = (option) => {
		this.setState((state, props) => {
			return {
				selectedOption: option[this.props.displayKey],
			};
		});
		this.props.selectedOptionCallback(option);
	};

	render() {
		return (
			<div tabIndex="0" className={styles["droplistSelectDiv"]}>
				<div className={styles["droplistSelectButton"]}>
					{this.state.selectedOption.length
						? this.state.selectedOption
						: "Select"}
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
				<div className={styles["droplistOptions"]}>
					{this.props.searchOptions.enableSearch ? (
						<Searchbar
							dataList={this.state.dataList}
							searchKeys={this.props.searchOptions.searchKeys}
							resultCallback={this.searchResultCallback}
							alignIcon={this.props.searchOptions.alignIcon}
							caseSensitive={this.props.searchOptions.caseSensitive}
							autoFocus={true}
							placeholder={this.props.searchOptions.placeholder}
							autoComplete={false}
						/>
					) : (
						<></>
					)}
					{this.state.dataList.map((option, index) => {
						return (
							<button
								onClick={() => {
									this.resultCallback(option);
								}}
								className={styles["option"]}
								key={index}
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
