import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.scss";
import searchIcon from "../../assets/images/icons/search.svg";
class Searchbar extends Component {
	handleChange = (event) => {
		this.props.onChange(event, this.props.caseSensitive || false);
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
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	autoFocus: PropTypes.bool,
	caseSensitive: PropTypes.bool,
	alignIcon: PropTypes.oneOf(["left", "right"]),
};

Searchbar.defaultProps = {
	placeholder: "",
	className: "",
	autoFocus: false,
	caseSensitive: false,
	alignIcon: "right",
};

export default Searchbar;
