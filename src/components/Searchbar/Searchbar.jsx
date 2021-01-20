import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.scss";
class Searchbar extends Component {
	handleChange = (event) => {
		this.props.onChange(event, this.props.caseSensitive || false);
	};
	render() {
		return (
			<div className={this.props.className}>
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
};

Searchbar.defaultProps = {
	placeholder: "",
	className: "",
	autoFocus: false,
	caseSensitive: false,
};

export default Searchbar;
