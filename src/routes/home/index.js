import { h, Component } from 'preact';
import style from './style';
import Threeobj from '../../components/threeEntry';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<Threeobj />
			</div>
		);
	}
}
