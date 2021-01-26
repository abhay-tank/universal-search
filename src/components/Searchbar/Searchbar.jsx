import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.scss";

/**
 * Renders a <Searchbar /> component
 * @component
 * @example
 *	<Searchbar
 *		dataList={this.state.data}
 *		searchKeys={["name", "description"]}
 *		caseSensitive={false}
 *		resultOnSubmit={true}
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
	/**
	 * @function searchContent
	 * @param {Event} event
	 * @fires props.resultCallback
	 */
	searchContent = () => {
		/**
		 * Check if input is not empty and is a valid string.
		 */
		if (this.state.searchInputValue.trim().length) {
			/**
			 * @property  {Array}
			 * Placeholder for props.searchKeys.
			 */
			const searchKeys = this.props.searchKeys;
			/**
			 * @property {Object}
			 * Stores searchKey and array of matched pattern objects. Imagine it as bucket for sorting data objects. Data Object would be sorted out in any one of the buckets.
			 * If we search for pattern "Jon" and key "name". All the objects with key "name" having pattern "Jon" would be stored in "nameData".
			 * If we search for pattern "Engineer" and key "description". All the objects with key "description" having pattern "Engineer" would be stored in "descriptionData".
			 * @example
			 * result = {
			 * 	nameData: [
			 * 		{
			 * 			name: "Some awesome name having Jon",
			 * 			description: "some description having X",
			 * 			...
			 * 		},
			 * 	],
			 * 	descriptionData: [
			 * 		{
			 * 			name: "Some other awesome name",
			 * 			description: "some description having Engineer",
			 * 		},
			 * 	]
			 * }
			 */
			let result = {};
			/**
			 * @property {Array}
			 * For storing final result.
			 * Initialized with keys in pattern of "searchKeyData" and empty array as value.
			 */
			let resultList = [];
			searchKeys.forEach((searchKey) => {
				result[`${searchKey}Data`] = [];
			});
			this.props.dataList.forEach((dataObject) => {
				/**
				 * Iterate searchKeys and search dataObject[searchKey] for pattern.
				 * If data is found, push object to result[searchKeyData] array.
				 */
				for (
					let searchKeyIndex = 0;
					searchKeyIndex < searchKeys.length;
					searchKeyIndex++
				) {
					const key = searchKeys[searchKeyIndex];
					if (dataObject[key]) {
						if (this.props.caseSensitive) {
							if (dataObject[key].includes(this.state.searchInputValue)) {
								result[`${key}Data`].push(dataObject);
								break;
							}
						} else {
							if (
								dataObject[key]
									.toLowerCase()
									.includes(this.state.searchInputValue.toLowerCase())
							) {
								result[`${key}Data`].push(dataObject);
								break;
							}
						}
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

	handleOnSubmit = (event) => {
		event.preventDefault();
		this.setState({ searchInputValue: event.target.searchInput.value });
		this.searchContent();
	};

	handleOnChange = (event) => {
		this.setState({ searchInputValue: event.target.value });
		if (!this.props.resultOnSubmit) {
			this.searchContent();
		}
	};
	render() {
		let {
			className,
			alignIcon,
			placeholder,
			autoFocus,
			iconColor,
		} = this.props;
		return (
			<div
				className={`${styles["inputContainer"]} ${styles[alignIcon]} ${
					className ? className : styles["defaultInput"]
				} ${alignIcon}`}
			>
				<svg
					className={styles["searchIcon"]}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					fill={iconColor.length ? iconColor : "black"}
				>
					<path d="M508.875 493.792L353.089 338.005c32.358-35.927 52.245-83.296 52.245-135.339C405.333 90.917 314.417 0 202.667 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c52.043 0 99.411-19.887 135.339-52.245l155.786 155.786a10.634 10.634 0 007.542 3.125c2.729 0 5.458-1.042 7.542-3.125 4.166-4.167 4.166-10.917-.001-15.083zM202.667 384c-99.979 0-181.333-81.344-181.333-181.333S102.688 21.333 202.667 21.333 384 102.677 384 202.667 302.646 384 202.667 384z" />
				</svg>
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
	 * If true result would be genrated onSubmit else onChange
	 */
	resultOnSubmit: PropTypes.bool,
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
	 * Color of search Icon
	 */
	iconColor: PropTypes.string,
};

Searchbar.defaultProps = {
	placeholder: "",
	className: "",
	autoFocus: false,
	caseSensitive: false,
	alignIcon: "right",
	resultOnSubmit: false,
	iconColor: "black",
};

export default Searchbar;
