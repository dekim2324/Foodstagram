import React, { Component } from 'react';

class Navbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={style}>
        <div style={container}>
          <span style={title}>iCook365</span>
        </div>
      </div>
    )
  }
}
const style = {
  background: "#3f51b5",
  height: "9vh",
  fontFamily: "Poppins,Helvetica,Arial,sans-serif",
  color: "white"
}
const title = {
  // display: 'block',
  // textAlign: 'center',
  // paddingTop: '20px',
  fontSize: '25px'
}
const container = {
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'

}

export default Navbar;