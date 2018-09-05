import { h, Component } from 'preact';
import style from './style';

import ThreeComponent from '../../components/threeComponent';
import Menu from '../../components/menu';
import TypedFooter from '../../components/typedFooter';

let toggleColor = false;

class Home extends Component {
	
	mouseOverMenu = () => {
		if (toggleColor !== true) {
			this.threeComponent.toggleColor(true);
			toggleColor = true;
		}
	}
	mouseLeftMenu = () => {
		if (toggleColor !== false) {
			this.threeComponent.toggleColor(false);
			toggleColor = false;
		}
	}

	menuClickEvent = (options) => {
		console.log(this.threeComponent);
		this.threeComponent.moveCameraALittle();
	}
	
	render() {
		return (
			<div class={style.home}>
				<Menu
					mouseOverMenu={this.mouseOverMenu}
					mouseLeftMenu={this.mouseLeftMenu}
					menuClickEvent={this.menuClickEvent}
				/>
				<ThreeComponent
					ref={threeComponent => this.threeComponent = threeComponent}
					width={'100%'}
					height={'100%'}
				/>
				<TypedFooter />
			</div>
		);
	}
}

export default Home;
