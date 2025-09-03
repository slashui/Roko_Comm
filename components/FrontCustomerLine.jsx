"use client"
import React from 'react'

/**
 * Scrolling Customer Logo Component
 * 
 * Displays a continuous horizontal scroll of client logos below the hero section,
 * featuring grayscale hover effects and smooth animations.
 */



const FrontCustomerLine = () => {
  
  const companies = [
    {
      name: 'HuntFlow',
      logo: '/customer_logo_1.png'
    },
    {
      name: 'Paragram',
      logo: '/customer_logo_2.png'
    },
    {
      name: 'PMGenius',
      logo: '/customer_logo_8.svg'
    },
    {
      name: 'BuddhaTalks',
      logo: '/customer_logo_4.svg'
    },
    {
      name: 'WebCreaf',
      logo: '/customer_logo_5.svg'
    },
    {
      name: 'AI AGENT LAB',
      logo: '/customer_logo_6.svg'
    }
  ];

  return (
    <div className="w-full max-w-4xl py-2 bg-transparent mx-auto">
     
      <div className="max-w-4xl mx-auto"> 

      <div className="relative w-full overflow-hidden">

        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10"></div>
        

        <div className="flex animate-scroll">

          <div className="flex shrink-0 gap-16 px-8 items-center">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="w-[150px] h-[60px] relative grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-200"
              >
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          
          <div className="flex shrink-0 gap-16 px-8 items-center">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="w-[150px] h-[60px] relative grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-200"
              >
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10"></div>
      </div>
      </div>
    </div>
  )
}

export default FrontCustomerLine