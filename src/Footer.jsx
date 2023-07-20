import React from 'react'
import "./Footer.css"

function Footer() {

    const year = new Date().getFullYear(); 

  return (
      <footer>{`Copyright © Robert Jiang ${year}`}</footer>
  )
}

export default Footer