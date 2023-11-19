import React from 'react'

function RightSectionImage({stepNumber}) {

    console.log(stepNumber,"stepNumber")
    return (
      <div className='imageContainer'>
        {stepNumber == 0 && (
          <div className='imageContent'>
            <div>

           <img src='/images/Stars.svg'/>
            </div>

           <div>
            <h1>Start turning your ideas into reality.</h1>
            <p>Create a free account and get full access to all features for 30-days. <br/> No credit card needed. Get started in 2 minutes.</p>
           </div>
          </div>
        )}
        {stepNumber === 1 && (
          <div className='imageContent'>
          <div>

         <img src='/images/UA6WKv.tif.svg'/>
          </div>

         <div>
          <h1>Verify your account now</h1>
        <p>Create a free account and get full access to all features for 30-days. No credit card needed. Get started in 2 minutes.</p>
         </div>
        </div>
        )}
        {stepNumber === 2 && (
           <div className='imageContent'>
           <div>

          <img src='/images/EalDDq.tif.svg'/>
           </div>

          <div>
           <h1>Setup your store the way you like</h1>
           <p>Create a free account and get full access to all features for 30-days. No credit card needed. Get started in 2 minutes.</p>
          </div>
         </div>
        )}
      </div>
    );
  
}

export default RightSectionImage