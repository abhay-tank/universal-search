import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.scss";

/**
 * Renders a <Searchbar /> component
 * @component
 * @example
 *	<Searchbar
 *		dataList={this.state.data}
 *		searchKey="name"
 *		alignIcon="right"
 *		resultOnSubmit={true}
 *		resultCallback={this.fetchResult}
 *		caseSensitive={false}
 *		className="searchInput"
 *		autoFocus={true}
 *		placeholder="Search"
 *	/>
 */
class Searchbar extends Component {
	searchContent = (event) => {
		event.preventDefault();
		let searchInputValue = this.props.resultOnSubmit
			? event.target.searchInput.value
			: event.target.value;
		if (searchInputValue.length) {
			const resultList = this.props.dataList.filter((dataObject) => {
				if (this.props.caseSensitive) {
					return dataObject[this.props.searchKey].includes(searchInputValue);
				} else {
					return dataObject[this.props.searchKey]
						.toLowerCase()
						.includes(searchInputValue.toLowerCase());
				}
			});
			this.props.resultCallback(resultList);
		}
	};
	render() {
		let {
			className,
			alignIcon,
			placeholder,
			autoFocus,
			resultOnSubmit,
			iconColor,
		} = this.props;
		return (
			<div
				className={`${styles["inputContainer"]} ${
					styles[this.props.alignIcon]
				} ${className ? className : styles["defaultInput"]} ${alignIcon}`}
			>
				<svg
					className={styles["searchIcon"]}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					fill={iconColor.length ? iconColor : "black"}
				>
					<path d="M508.875 493.792L353.089 338.005c32.358-35.927 52.245-83.296 52.245-135.339C405.333 90.917 314.417 0 202.667 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c52.043 0 99.411-19.887 135.339-52.245l155.786 155.786a10.634 10.634 0 007.542 3.125c2.729 0 5.458-1.042 7.542-3.125 4.166-4.167 4.166-10.917-.001-15.083zM202.667 384c-99.979 0-181.333-81.344-181.333-181.333S102.688 21.333 202.667 21.333 384 102.677 384 202.667 302.646 384 202.667 384z" />
				</svg>
				<form onSubmit={resultOnSubmit ? this.searchContent : null}>
					<input
						id="searchInput"
						name="searchInput"
						className={styles["universalInput"]}
						placeholder={placeholder}
						onChange={!resultOnSubmit ? this.searchContent : null}
						type="text"
						autoFocus={autoFocus}
					/>
				</form>
			</div>
		);
	}
}

Searchbar.propTypes = {
	/**
	 * Callback function when result is generated
	 */
	resultCallback: PropTypes.func.isRequired,
	/**
	 * List on which search is to be performed
	 */
	dataList: PropTypes.array.isRequired,
	/**
	 * Key or item you want to search
	 */
	searchKey: PropTypes.string.isRequired,
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
	iconColor: "",
};

export default Searchbar;
