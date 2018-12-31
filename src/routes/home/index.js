import { h, Component } from 'preact'
import style from './style'

import ThreeComponent from '../../components/threeComponent'
import Menu from '../../components/menu'
import TypedFooter from '../../components/typedFooter'

let toggleColor = false
const HOVER_MESH_BLUE = '#30e1f4'
const HOVER_MESH_RED = 'red'

const CAMERA_POS = {
	HOME: {x: 0, y: 0, z: 10},
	ABOUT: {x: -10, y: -10, z: 10},
	PORTFOLIO: {x: 20, y: 20, z: 10},
	INTERESTS: {x: -30, y: -30, z: 10},
	CONTACT: {x: 40, y: 40, z: 10}
}

class Home extends Component {
	// position tracks which "menu" clicked, where the camera is moved
	state = {
		showIcon: false,
		menuOpen: true,
		position: 0
	}

	mouseOverMenu = (num) => {
		if (toggleColor !== true) {
			if (num === 0){
				this.threeComponent.toggleColor(true, HOVER_MESH_BLUE, HOVER_MESH_BLUE)
				toggleColor = true
			} else if (num === 1) {
				this.threeComponent.toggleColor(true, HOVER_MESH_RED, HOVER_MESH_BLUE)
				toggleColor = true
			} else if (num === 2) {
				this.threeComponent.toggleColor(true, HOVER_MESH_BLUE, HOVER_MESH_RED)
				toggleColor = true
			}
			else if (num === 3) {
				this.threeComponent.toggleColor(true, HOVER_MESH_RED, HOVER_MESH_RED)
				toggleColor = true
			}
			else {
				this.threeComponent.toggleColor(true, HOVER_MESH_BLUE, HOVER_MESH_BLUE)
				toggleColor = true
			}
		}
	}
	mouseLeftMenu = () => {
		if (toggleColor !== false) {
			this.threeComponent.toggleColor(false)
			toggleColor = false
		}
	}
	hideMenu = () => {
		this.setState({ menuOpen: false, showIcon: true })
	}
	mouseOverIcon = () => {
		this.setState({ menuOpen: true })
	}
	mouseLeftFullMenu = () => {
		if (this.state.menuOpen && this.state.showIcon) {
			this.setState({ menuOpen: false })
		}
	}

	menuClickEvent = (pos) => {
		this.hideMenu()
		let targetPos
		if (pos === 0) { targetPos = CAMERA_POS.HOME }
		else if (pos === 1) { targetPos = CAMERA_POS.ABOUT }
		else if (pos === 2) { targetPos = CAMERA_POS.PORTFOLIO }
		else if (pos === 3) { targetPos = CAMERA_POS.INTERESTS }
		else if (pos === 4) { targetPos = CAMERA_POS.CONTACT }
		this.threeComponent.moveCamera(targetPos)
	}

	
	render({}, state) {
		const iconClass = (state.showIcon) ? style.showIcon : style.hideIcon
		return (
			<div class={style.home}>
				<Menu ref={menu => this.menu = menu}
					show={this.state.menuOpen}
					showIcon={this.state.showIcon}
					mouseOverMenu={this.mouseOverMenu}
					mouseLeftFullMenu={this.mouseLeftFullMenu}
					mouseLeftMenu={this.mouseLeftMenu}
					menuClickEvent={this.menuClickEvent}
				/>
				<div ref={icon => this.icon = icon}
					className={[style.menuIcon, iconClass].join(' ')}
					onMouseOver={this.mouseOverIcon}
					onMouseLeave={this.mouseLeftIcon}>&#8702;</div>
				<ThreeComponent
					ref={threeComponent => this.threeComponent = threeComponent}
					width={'100%'}
					height={'100%'}
				/>
				<TypedFooter />
			</div>
		)
	}
}

export default Home
