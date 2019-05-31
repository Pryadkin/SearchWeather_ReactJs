import React, {Component} from 'react'
import classes from './Preloader.module.css'

export default class Preloader extends Component {
   constructor(props) {
      super(props)
      console.log(props.preloader.name)      
   }
   
   
   
   render() {
      const loader = [classes.Preloader];
      if (!this.props.preloader) {
         loader.push(`${classes.done}`)
      }   
      return (
         <div className={loader.join(' ')}>
            {/* <div classesName={classes.done}>1</div> */}
            <div className={classes.PreloaderIcon}></div>
         </div>
      )
   }   
}


