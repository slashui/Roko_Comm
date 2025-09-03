import React, { useState } from 'react';
import { FaStarOfLife } from "react-icons/fa";
import axios from 'axios';


/**
 * Landing Page Waitlist Form Component
 * 
 * Collects user information including name, email, project description 
 * and social media for early access signup.
 */


function WaitlistForm({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [aiDescription, setAIDescription] = useState('');
  const [twitterID, setTwitterID] = useState('');
  const [submitted, setSubmitted] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
        name,
        email,
        aiDescription,
        twitterID
      };
      setLoading(true);
    const waitList = JSON.stringify(formData);
    try {
        await axios.post('/api/waitlist', waitList);
        setSubmitted(true);
    }catch (error) {
        if (error.response) {
          
          console.error('Request failed with status code:', error.response.status);
          console.error('Error response:', error.response.data);
          toast.error('An error occurred while adding to waitlist');
        } else if (error.request) {
          
          console.error('No response received:', error.request);
          toast.error('No response from the server');
        } else {
          
          console.error('Error sending request:', error.message);
          toast.error('An error occurred while sending the request');
        }
      }

  };

  return (
    <div className="border-4 border-[#8a54e8] rounded-2xl h-[430px]">
        <div className='flex justify-center items-center   bg-[#8a54e8]/30 text-primary py-4'><FaStarOfLife className="mr-4" />
          Invite 20 developers in the testing.<FaStarOfLife className="ml-4" />
        </div>
      
        {submitted ? (
              <div className='h-full w-full flex items-center justify-center flex-col'>
                      <img src='/icon/check-7050.svg' className='rounded-full w-32' />
                      <h1 className='font-inter text-4xl my-4'>Rock on!</h1>
                      <p className='text-zinc-400 text-lg mb-16'>We will update you soon with your invite</p>
              </div>
          ) : (
            <form  className='px-8 w-full py-4 leading-3'>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className='bg-black w-full border  border-zinc-700 rounded-xl' placeholder='Your Name' /><br /><br />
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='bg-black w-full border  border-zinc-700 rounded-xl' placeholder='Email' /><br /><br />
              <textarea id="aiDescription" name="aiDescription" rows="4" value={aiDescription} onChange={(e) => setAIDescription(e.target.value)}  className='bg-black w-full border  border-zinc-700 rounded-xl' placeholder='Your Project Description' /><br /><br />
              <input type="text" id="twitterID" name="twitterID" value={twitterID} onChange={(e) => setTwitterID(e.target.value)} className='bg-black w-full border  border-zinc-700 rounded-xl' placeholder='Twitter ID' /><br /><br />
              <a onClick={handleSubmit} className=" w-full flex justify-center py-2 text-lg font-semibold bg-black text-white rounded-full dark:bg-primary hover:dark:bg-primary/80 dark:text-gray-900" >
                  {loading ? (
                      <img src='/icon/loading.svg' className='w-12' />
                  ) : (
                      'Submit'
                  )}
              </a>
            </form>
          )}
      </div>
  );
}

export default WaitlistForm;