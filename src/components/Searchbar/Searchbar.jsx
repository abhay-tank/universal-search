import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
/**
 * Renders a <Searchbar /> component
 * @component
 * @example
 *	<Searchbar
 *		dataList={this.state.data}
 *		searchKeys={["name", "description"]}
 *		caseSensitive={false}
 *		resultCallback={this.fetchResult}
 *		className="searchInput"
 *		alignIcon="right"
 *		autoFocus={true}
 *		placeholder="Search"
 * 		iconColor="black"
 *	/>
 */
class Searchbar extends Component {
	state = {
		searchInputValue: "",
	};

	componentDidUpdate = () => {
		this.searchContent();
	};
	/**
	 * @function searchContent
	 * @param {Event} event
	 * @fires props.resultCallback
	 */
	searchContent = () => {
		if (this.state.searchInputValue.trim().length) {
			const searchKeys = this.props.searchKeys;
			let result = {};
			let resultList = [];
			searchKeys.forEach((searchKey) => {
				result[`${searchKey}Data`] = [];
			});
			this.props.dataList.forEach((dataObject) => {
				for (
					let searchKeyIndex = 0;
					searchKeyIndex < searchKeys.length;
					searchKeyIndex++
				) {
					const key = searchKeys[searchKeyIndex];
					if (!dataObject[key]) return;
					if (
						this.props.caseSensitive &&
						dataObject[key].includes(this.state.searchInputValue)
					) {
						result[`${key}Data`].push(dataObject);
						break;
					} else if (
						!this.props.caseSensitive &&
						dataObject[key]
							.toLowerCase()
							.includes(this.state.searchInputValue.toLowerCase())
					) {
						result[`${key}Data`].push(dataObject);
						break;
					}
				}
			});
			/**
			 * Create sorted list of result with order of props.searchKeys
			 */
			searchKeys.forEach((searchKey) => {
				resultList.push(...result[`${searchKey}Data`]);
			});
			/**
			 * Execute callback and return result.
			 */
			this.props.resultCallback(resultList);
		}
	};

	/**
	 * @function handleOnSubmit
	 * @param {Event} event
	 * @fires searchContent
	 * Sets searchInputValue inside state and executes searchContent.
	 */
	handleOnSubmit = (event) => {
		event.preventDefault();
		this.setState({ searchInputValue: event.target.searchInput.value });
	};

	handleOnChange = (event) => {
		this.setState({ searchInputValue: event.target.value });
	};
	render() {
		let { className, alignIcon, icon, placeholder, autoFocus } = this.props;
		return (
			<div
				className={`${styles["inputContainer"]} ${styles[alignIcon]} ${
					className ? className : styles["defaultInput"]
				} ${alignIcon}`}
			>
				{icon}
				<form onSubmit={this.handleOnSubmit}>
					<input
						id="searchInput"
						name="searchInput"
						className={styles["universalInput"]}
						placeholder={placeholder}
						onChange={this.handleOnChange}
						type="text"
						value={this.state.searchInputValue}
						autoFocus={autoFocus}
					/>
				</form>
			</div>
		);
	}
}

Searchbar.propTypes = {
	/**
	 * Callback function when result is generated (Required)
	 */
	resultCallback: PropTypes.func.isRequired,
	/**
	 * List on which search is to be performed (Required)
	 */
	dataList: PropTypes.array.isRequired,
	/**
	 * Keys or items you want to search (Required)
	 */
	searchKeys: PropTypes.arrayOf(PropTypes.string),
	/**
	 * SCSS className
	 */
	className: PropTypes.string,
	/**
	 * Input placeholder
	 */
	placeholder: PropTypes.string,
	/**
	 * Input autofocus
	 */
	autoFocus: PropTypes.bool,
	/**
	 * Should search be caseSesnsitive
	 */
	caseSensitive: PropTypes.bool,
	/**
	 * Align search icon to left or right
	 */
	alignIcon: PropTypes.oneOf(["left", "right"]),
	/**
	 * Icon displayed along side input field
	 */
	icon: PropTypes.element,
};

Searchbar.defaultProps = {
	placeholder: "",
	className: "",
	autoFocus: false,
	caseSensitive: false,
	alignIcon: "right",
	icon: <FontAwesomeIcon icon={faSearch} />,
};

export default Searchbar;
