import React from 'react'
import './FooterContent.css'
import rfc_logo from '../../images/logo.png'
// import Socialicons from '../Socialicons/Socialicons'

function FooterContent() {
  return (
    <div className="container py-4">
      <div className="row justify-content-between">
        <div className="col-md-6">
          <a href='/'>
          <img className='mb-4' src={rfc_logo} width={150} height={150} />
          </a>
          <div>IS THE PLACE TO FIND THE NEXT BIG CRYPTO COIN</div>
        </div>
        <div className="col-md-3 text-center">
          <h4 className='text-white text-uppercase mb-4'>Social Links</h4>
          {/* <Socialicons /> */}
        </div>
      </div>
    </div>
  )
}

export default FooterContent