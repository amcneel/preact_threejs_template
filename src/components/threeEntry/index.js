import { h, Component } from 'preact';
import style from './style.scss';

import threeEntryPoint from './threejs/threeEntryPoint.js';

export default class ThreeContainer extends Component {
	
	
	componentDidMount() {
		threeEntryPoint(this.threeRootElement);
	}

	render() {
		return (
			<div ref={threeRootElement => this.threeRootElement = threeRootElement} class={style.main} />
		);
	}
}
