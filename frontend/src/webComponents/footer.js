import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <div className='margin-top-5'>
      <MDBFooter bgColor='light' className='text-center text-lg-left fixed-bottom'>
      <div className='text-center p-3'>
            Powered by .  
        <a className='text-primary' href='https://finnhub.io' >
            Finnhub.io
        </a>
      </div>
    </MDBFooter>
    </div>
  );
}

export default Footer;