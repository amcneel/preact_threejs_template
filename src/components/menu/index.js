import { h } from 'preact'

import style from './style.css';

const Menu = (props) => {
  let visibilityClass
  if (props.show && props.showIcon) {
    visibilityClass = style.showIcon
  }
  else if (props.show) {
    visibilityClass = style.show
  }
  else {
    visibilityClass = style.hide
  }
  
  return (
    <div className={[style.menu, visibilityClass].join(' ')} onMouseLeave={props.mouseLeftFullMenu}>
      <div class={style.menuItemWrapper}>
        <div class={style.menuItem}
          onMouseOver={() => {props.mouseOverMenu(0)}}
          onMouseLeave={props.mouseLeftMenu}
          onClick={() => props.menuClickEvent(0)}>Home</div>
      </div>
      <div class={style.menuItemWrapper}>
        <div class={style.menuItem}
          onMouseOver={() => {props.mouseOverMenu(1)}}
          onMouseLeave={props.mouseLeftMenu}
          onClick={() => props.menuClickEvent(1)}>About Me</div>
      </div>
      <div class={style.menuItemWrapper}>
        <div class={style.menuItem}
          onMouseOver={() => {props.mouseOverMenu(2)}}
          onMouseLeave={props.mouseLeftMenu}
          onClick={() => props.menuClickEvent(2)}>Portfolio</div>
      </div>
      <div class={style.menuItemWrapper}>
        <div class={style.menuItem}
          onMouseOver={() => {props.mouseOverMenu(3)}}
          onMouseLeave={props.mouseLeftMenu}
          onClick={() => props.menuClickEvent(3)}>Interests</div>
      </div>
      <div class={style.menuItemWrapper}>
        <div class={style.menuItem}
          onMouseOver={() => {props.mouseOverMenu(4)}}
          onMouseLeave={props.mouseLeftMenu}
          onClick={() => props.menuClickEvent(4)}>Contact Me</div>
      </div>
    </div>
  )
}

export default Menu;