import React from 'react'

/**
 * AuthBrand Component
 * 
 * This component displays the brand content on the left side of the authentication pages (login/register).
 * It features:
 * - A motivational quote from Kent Beck about software development principles
 * - A background video showing an office environment
 * - Responsive text sizing using Tailwind CSS classes
 * - The Bebas font family for stylized text display
 * 
 * The component creates an immersive visual experience while maintaining the brand identity
 * during the authentication process.
 */


const AuthBrand = () => {
  return (

<header className="relative flex items-center justify-center h-screen mb-12 overflow-hidden">
<div className="relative z-30 p-5  lg:text-6xl 2xl:text-8xl font-Bebas text-primary">
      Make it work,<br />
      Make it right,<br />
      Make it fast.
      <div className='text-4xl'>——Kent Beck</div>
  </div>
  <video 
    src="/r.mp4" 
    autoPlay 
    muted 
    loop 
    className="absolute z-10 w-auto min-w-full min-h-full max-w-none" 
  />
</header>
  )
}

export default AuthBrand