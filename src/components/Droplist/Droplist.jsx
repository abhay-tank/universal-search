import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
// import PropTypes from 'prop-types'
import styles from "./Droplist.module.scss";
export class Droplist extends Component {
	static propTypes = {};
	getSearchResult = (result) => {
		console.log(result);
	};

	render() {
		return (
			<div tabIndex="0" className={styles["droplistSelectDiv"]}>
				<button className={styles["droplistSelectButton"]}>Select</button>
				<div className={styles["droplistOptions"]}>
					<Searchbar
						dataList={this.props.dataList}
						searchKeys={["name", "description"]}
						resultCallback={this.getSearchResult}
					/>
					{this.props.dataList.map((option) => {
						return (
							<div key={option.uid} className={styles["option"]}>
								{option.name}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Droplist;
