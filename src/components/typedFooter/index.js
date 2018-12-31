import { h } from 'preact';
import style from './style.css';

import Typed from 'react-typed';

const onComplete = () => {
  setTimeout(() => {
    this.typed.cursor.style.visibility = 'hidden';
  }, 1400)
}

const TypedFooter = (props) => (
  <div style={ownStyles.container} class={style.footerContainer}>
    <Typed
      typedRef={(typed) => { this.typed = typed } }
      style={ownStyles.typed}
      strings={['Welcome', '...', '...loading']} 
      typeSpeed={80}
      smartBackspace={true}
      backDelay={600}
      backSpeed={60}
      onComplete={ onComplete }
    />
  </div>
)

const ownStyles = {
  container: {
    display: 'inline',
    position: 'absolute',
    bottom: '0px',
    padding: '5px 20px'
  },
  typed: {
    fontSize: '20px',
    color: 'white'
  }
}

export default TypedFooter;