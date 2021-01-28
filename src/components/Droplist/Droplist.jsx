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
		filteredList: [],
		selectedOption: "",
	};

	searchResultCallback = (result) => {
		this.setState({ filteredList: [...result] });
	};

	resultCallback = (option) => {
		this.setState({
			selectedOption: option[this.props.displayKey],
		});
		this.props.selectedOptionCallback(option);
	};

	render() {
		// conditional datalist
		const { dataList, displayKey, searchOptions } = this.props;
		const optionList = this.state.filteredList.length
			? this.state.filteredList
			: dataList;
		return (
			<div tabIndex="0" className={styles["droplistSelectDiv"]}>
				<div className={styles["droplistSelectButton"]}>
					{this.state.selectedOption.length
						? this.state.selectedOption
						: "Select"}
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
				<div className={styles["droplistOptions"]}>
					{searchOptions.enableSearch && (
						<Searchbar
							dataList={dataList}
							searchKeys={searchOptions.searchKeys}
							resultCallback={this.searchResultCallback}
							alignIcon={searchOptions.alignIcon}
							caseSensitive={searchOptions.caseSensitive}
							autoFocus={true}
							placeholder={searchOptions.placeholder}
							autoComplete={false}
						/>
					)}
					{optionList.map((option, index) => {
						return (
							<button
								onClick={() => {
									this.resultCallback(option);
								}}
								className={styles["option"]}
								key={index}
							>
								{option[displayKey]}
							</button>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Droplist;
