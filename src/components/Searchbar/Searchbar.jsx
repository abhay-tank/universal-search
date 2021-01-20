import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.scss";
import searchIcon from "../../assets/images/icons/search.svg";
class Searchbar extends Component {
	handleChange = (event) => {
		if (event.target.value.length) {
			const resultList = this.props.dataList.filter((dataObject) => {
				if (this.props.caseSensitive) {
					return dataObject[this.props.searchKey].includes(event.target.value);
				} else {
					return dataObject[this.props.searchKey]
						.toLowerCase()
						.includes(event.target.value.toLowerCase());
				}
			});
			this.props.resultCallback(resultList);
		}
	};
	render() {
		return (
			<div
				className={`${styles["inputContainer"]} ${
					styles[this.props.alignIcon]
				} ${
					this.props.className ? this.props.className : styles["defaultInput"]
				} ${this.props.alignIcon}`}
			>
				<img src={searchIcon} alt="searchIcon" />
				<input
					className={styles["universalInput"]}
					placeholder={this.props.placeholder}
					onChange={this.handleChange}
					type="text"
					autoFocus={this.props.autoFocus}
				/>
			</div>
		);
	}
}

Searchbar.propTypes = {
	placeholder: PropTypes.string,
	className: PropTypes.string,
	autoFocus: PropTypes.bool,
	caseSensitive: PropTypes.bool,
	alignIcon: PropTypes.oneOf(["left", "right"]),
	resultCallback: PropTypes.func.isRequired,
	dataList: PropTypes.array.isRequired,
	searchKey: PropTypes.string.isRequired,
};

Searchbar.defaultProps = {
	placeholder: "",
	className: "",
	autoFocus: false,
	caseSensitive: false,
	alignIcon: "right",
};

export default Searchbar;
