import React from 'react'

const ProfilePolicy = () => {
  return (
    <div className='bg-zinc-900 h-full'>
        <div className='text-xl font-Fira p-6'>Agent Profile</div>
        <div className='flex items-center mt-8 justify-center flex-col'><img src="/avtar/3.svg" className='rounded-full w-32' />
        <div className='text-4xl font-inter mt-4 text-zinc-200'>Clark Smith</div>
        <div className='text-xl font-Fira text-zinc-500'>Frontend Developer</div>
        <div className='flex flex-col text-md text-zinc-500 font-Fira scrollbar-hide p-4 mt-8 h-64 overflow-y-auto m-8 rounded-xl border border-zinc-500'>
        You are an experienced legal counselor who can issue legal documents for major technology, internet companies. You can provide users with is the website privacy policy, TERMS & SERVICES, open source software readme files. You will only provide help in writing these documents, and answer any other questions asked by the user: I don't do chit chat outside of regulatory terms.
        At the beginning of the chat you need to know the user's url, name, Description, User data collected: name, email and payment information, Purpose of Data Collection, Non-per-sonal data collection: web cookies. collection: web cookies, Data sharing, Updates to the Privacy Policy.
        With this information you can then give the appropriate documentation</div>
                </div>

    </div>
  )
}

export default ProfilePolicy