import { h } from 'preact'

import style from './style.css';

const Menu = (props) => (
  <div class={style.menu}>
    <div class={style.menuItem}
      onMouseOver={props.mouseOverMenu}
      onMouseLeave={props.mouseLeftMenu}
      onClick={props.menuClickEvent}
    >
      Home
    </div>
    <div class={style.menuItem} onMouseOver={props.mouseOverMenu} onMouseLeave={props.mouseLeftMenu} onClick={props.menuClickEvent}>About Me</div>
    <div class={style.menuItem} onMouseOver={props.mouseOverMenu} onMouseLeave={props.mouseLeftMenu} onClick={props.menuClickEvent}>Portfolio</div>
    <div class={style.menuItem} onMouseOver={props.mouseOverMenu} onMouseLeave={props.mouseLeftMenu} onClick={props.menuClickEvent}>Interests</div>
    <div class={style.menuItem} onMouseOver={props.mouseOverMenu} onMouseLeave={props.mouseLeftMenu} onClick={props.menuClickEvent}>Contact Me</div>
  </div>
)

export default Menu;