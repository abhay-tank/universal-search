import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Droplist.module.scss";
import Searchbar from "../Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown,
	faAngleUp,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
export class Droplist extends Component {
	constructor(props) {
		super(props);
		this.optionDivRef = React.createRef();
	}
	static propTypes = {
		dataList: PropTypes.arrayOf(Object).isRequired,
		selectedOptionCallback: PropTypes.func.isRequired,
		displayKey: PropTypes.string.isRequired,
		searchOptions: PropTypes.object,
		placeHolder: PropTypes.string,
	};

	state = {
		filteredList: [],
		selectedOption: "",
		showOptions: false,
	};

	componentDidUpdate = () => {
		if (this.state.showOptions) {
			this.optionDivRef.current.classList.remove(styles["hidden"]);
		} else {
			this.optionDivRef.current.classList.add(styles["hidden"]);
		}
	};

	searchResultCallback = (result) => {
		this.setState({ filteredList: [...result] });
	};

	removeSelectedOption = () => {
		this.setState({ selectedOption: "" });
	};

	hideOptions = (event) => {
		if (
			event.currentTarget.id === event.target.id &&
			!event.currentTarget.contains(event.relatedTarget)
		) {
			this.toggleDiv();
		}
	};

	toggleDiv = () => {
		this.setState({ showOptions: !this.state.showOptions });
	};

	resultCallback = (option) => {
		this.setState({
			selectedOption: option[this.props.displayKey],
		});
		this.props.selectedOptionCallback(option);
		this.toggleDiv();
	};

	render() {
		// conditional datalist
		const { selectedOption, showOptions, filteredList } = this.state;
		const { dataList, displayKey, searchOptions, placeHolder } = this.props;
		const optionList = filteredList.length ? filteredList : dataList;
		return (
			<div
				tabIndex="0"
				id="dropListSelect"
				onBlur={this.hideOptions}
				className={styles["droplistSelectDiv"]}
			>
				<div className={styles["droplistSelectButton"]}>
					{selectedOption.length ? (
						<>
							{" "}
							{selectedOption}
							<FontAwesomeIcon
								icon={faTimes}
								className={styles["iconButton"]}
								onClick={this.removeSelectedOption}
							/>
						</>
					) : (
						<>
							{" "}
							{placeHolder}
							<FontAwesomeIcon
								onClick={this.toggleDiv}
								className={styles["iconButton"]}
								icon={showOptions ? faAngleUp : faAngleDown}
							/>
						</>
					)}
				</div>
				<div
					ref={this.optionDivRef}
					className={`${styles["droplistOptions"]} ${styles["hidden"]}`}
				>
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
								id={option[displayKey]}
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
