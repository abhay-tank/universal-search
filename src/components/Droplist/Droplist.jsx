import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Droplist.module.scss";
import Searchbar from "../Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown,
	faAngleUp,
	faTimes,
	faCheckSquare as faCheckSquareSolid,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare as faCheckSquareRegular } from "@fortawesome/free-regular-svg-icons";

/**
 * Renders a <Droplist /> component
 * @component
 * @example
 * 	<Droplist
 * 		selectedOptionCallback={this.selectedOption}
 * 		dataList={this.state.data}
 * 		displayKey="name"
 * 		placeHolder="Select Something"
 * 		multipleSelect={false}
 * 		searchOptions={{
 * 			enableSearch: true,
 * 			searchKeys: ["name"],
 * 			caseSensitive: false,
 * 			placeholder: "Search",
 * 			alignIcon: "right",
 * 		}}
 * 	/>
 */
class Droplist extends Component {
	constructor(props) {
		super(props);
		this.optionDivRef = React.createRef();
	}

	state = {
		filteredList: [],
		showOptions: false,
		selectedOptions: [],
	};

	componentDidUpdate = () => {
		if (this.state.showOptions) {
			this.optionDivRef.current.classList.remove(styles["hidden"]);
		} else {
			this.optionDivRef.current.classList.add(styles["hidden"]);
		}
	};

	/**
	 * @function searchResultCallback
	 * Retrieve filtered array of objects after performing search in dataList.
	 * @param {Array} result
	 */
	searchResultCallback = (result) => {
		this.setState({ filteredList: [...result] });
	};

	/**
	 * @function removeSelectedOption
	 * Clear selectedOption or all selectedOptions.
	 */
	removeSelectedOption = () => {
		this.setState({ selectedOptions: [] });
	};

	/**
	 * @function addSelectedOption
	 * If multipleSelect is true, then selected option is added to selectedOptions Array.
	 * @param {Object} option
	 */
	addSelectedOption = (option) => {
		this.setState({
			selectedOptions: [...this.state.selectedOptions, option],
		});
		if (!this.props.multipleSelect) {
			const { selectedOptionCallback } = this.props;
			selectedOptionCallback(option);
			this.toggleDiv();
		}
	};

	/**
	 * @function removeFromSelectedOptions
	 * If multipleSelect is true, then selected option will be removed from selectedOptions Array.
	 * @param {Object} option
	 */
	removeFromSelectedOptions = (option) => {
		const { selectedOptionCallback, displayKey } = this.props;
		const { selectedOptions } = this.state;
		this.setState({
			selectedOptions: selectedOptions.filter(
				(selectedOption) => selectedOption[displayKey] !== option[displayKey]
			),
		});
		selectedOptionCallback(selectedOptions);
	};

	// UTIL functions
	/**
	 * @function isSelected
	 * Check if option is in selectedOptions. If yes return true else false.
	 * @param {Object} option
	 */
	isSelected = (option) => {
		return this.state.selectedOptions.includes(option) ? true : false;
	};

	/**
	 * @function hideOptions
	 * Toggle optionsDiv. If multipleSelect is true, execute selectedOptionCallback.
	 * @param {Event} event
	 */
	hideOptions = (event) => {
		const { selectedOptionCallback, multipleSelect } = this.props;
		const { selectedOptions } = this.state;
		if (
			event.currentTarget.id === event.target.id &&
			!event.currentTarget.contains(event.relatedTarget)
		) {
			this.toggleDiv();
			if (multipleSelect) {
				selectedOptionCallback(selectedOptions);
			}
		}
	};

	/**
	 * @function toggleDiv
	 * Show / Hide optionsDiv
	 */
	toggleDiv = () => {
		this.setState({ showOptions: !this.state.showOptions });
	};

	render() {
		const { selectedOptions, showOptions, filteredList } = this.state;
		const {
			dataList,
			displayKey,
			searchOptions,
			placeHolder,
			multipleSelect,
		} = this.props;
		const optionList = filteredList.length ? filteredList : dataList;
		return (
			<div
				tabIndex="0"
				id="dropListSelect"
				onBlur={this.hideOptions}
				className={styles["droplistSelectDiv"]}
			>
				<div className={styles["droplistSelect"]}>
					{selectedOptions.length ? (
						<div className={styles["selectedKeys"]}>
							{multipleSelect ? (
								selectedOptions.map((selectedOption, index) => {
									return (
										<div className={styles["multiSelectOption"]} key={index}>
											{selectedOption[displayKey].length > 10
												? selectedOption[displayKey].substring(0, 10) + "..."
												: selectedOption[displayKey]}
											<FontAwesomeIcon
												onClick={() => {
													this.removeFromSelectedOptions(selectedOption);
												}}
												className={styles["removeSelectedIcon"]}
												icon={faTimesCircle}
											/>
										</div>
									);
								})
							) : (
								<div>{selectedOptions[0][displayKey]}</div>
							)}
						</div>
					) : (
						<>{placeHolder}</>
					)}
					<div className={styles["icons"]}>
						{selectedOptions.length ? (
							<FontAwesomeIcon
								className={styles["removeSelectedIcon"]}
								onClick={this.removeSelectedOption}
								icon={faTimes}
							/>
						) : (
							<></>
						)}
						<FontAwesomeIcon
							onClick={this.toggleDiv}
							className={styles["iconButton"]}
							icon={
								selectedOptions.length && showOptions ? faAngleUp : faAngleDown
							}
						/>
					</div>
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
							<div
								className={`${styles["option"]} ${
									this.isSelected(option) ? styles["isSelected"] : ""
								}`}
								onClick={() => {
									this.addSelectedOption(option);
								}}
								key={index}
							>
								{multipleSelect ? (
									<FontAwesomeIcon
										icon={
											this.isSelected(option)
												? faCheckSquareSolid
												: faCheckSquareRegular
										}
									/>
								) : (
									<></>
								)}
								<button id={option[displayKey]}>{option[displayKey]}</button>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

Droplist.propTypes = {
	/**
	 * Array of objects which should be rendered.
	 */
	dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
	/**
	 * Callback when selectedOption/selectedOptions are toggled.
	 */
	selectedOptionCallback: PropTypes.func.isRequired,
	/**
	 * Object key which should be displayed as option.
	 */
	displayKey: PropTypes.string.isRequired,
	/**
	 * Allow multiple select.
	 */
	multipleSelect: PropTypes.bool,
	/**
	 * Integrate search among options.
	 */
	searchOptions: PropTypes.object,
	/**
	 * Placeholder when no options are selected.
	 */
	placeHolder: PropTypes.string,
};

Droplist.defaultProps = {
	placeHolder: "Select",
	multipleSelect: false,
	searchOptions: { enableSearch: false },
};

export default Droplist;
