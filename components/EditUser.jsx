"use client"

import { useState, useEffect } from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';


/**
 * User Profile Edit Component
 * 
 * This component handles the editing of user profile information.
 * Key functionalities include:
 * 1. Fetching existing user data from the API
 * 2. Displaying editable form fields with current user information
 * 3. Handling form submission to update user details
 * 4. Managing loading states during API operations
 * 
 * The component uses:
 * - Axios for API communication
 * - Next.js router for navigation
 * - React state management for form handling
 * - Loading states to improve user experience
 * 
 * The edit flow includes:
 * 1. Initial data fetch when component mounts
 * 2. Real-time form updates as user types
 * 3. Submission handling with API integration
 * 4. Automatic page refresh after successful update
 */



const EditUser = ({ userData, texts }) => {
    const [noteToEdit, setNoteToEdit] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const id = userData
    
    const getUser = () => {
      if (id) {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/api/user/${id}`);
            setNoteToEdit(res.data);
            setIsLoading(false); 
          } catch (error) {
            console.error('Error fetching user:', error);
            
          }
        };
        fetchData();
        setIsLoading(true); 

      }
    };
    
    

    const handleEditSubmit = (e) => {
      e.preventDefault(); 
      axios
      .patch(`/api/user/${userData.id}`, noteToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.refresh();
      });
      
    };

    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setNoteToEdit((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
      getUser();
    }, [id]);

  return (
    <div>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
     
      
      <form onSubmit={handleEditSubmit} className='w-full '>


        <div className='flex flex-row w-full h-[80px] mt-6 '>
          <div className='w-2/3 flex flex-row items-center'>
            <img src={noteToEdit.image} className='rounded-full' width="70px" height="70px" />
            <div>
       
          <div className="ml-6 mt-12">
          <label for="name" className="block  text-sm font-medium text-gray-900 dark:text-white">{texts.usernameLabel}</label>
         
          <div className="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px] mb-8 md:mb-12"> 
            <input type="text" value={noteToEdit.name || ''} onChange={handleChange} id="name" name="name" className="input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit" placeholder={texts.usernameLabel} required="" />
          </div>     
           
          </div>
        </div>
          </div>
          <div className='w-1/3 flex justify-end'><button type="submit" className='dark:bg-primary font-inter bg-[#f7ce49] px-8 hover:bg-[#f7ce49]/80 text-black rounded-md'>{texts.saveButton}</button></div>
        </div>

        <hr className='my-8 border dark:border-zinc-700 border-zinc-200' />
      

        <label for="email" className="block mb-1 mt-4 text-sm font-medium text-gray-900 dark:text-white">{texts.emailLabel}</label>
          
        <div className="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px] mb-8 md:mb-12"> 
               
                <input type="text" value={noteToEdit.email || ''} onChange={handleChange} id="email" name="email" className="input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit" placeholder="name@company.com" required />
            </div>
        

        <label for="homepage" className="block mb-1 mt-4 text-sm font-medium text-gray-900 dark:text-white">{texts.homePageLabel}</label>
          
        <div className="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px] mb-8 md:mb-12"> 
               
                <input type="text" value={noteToEdit.homepage || ''} onChange={handleChange} name="homepage" id="homepage" className=" input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit" placeholder={texts.homePageDescription} required />
            </div>
        

        <label for="aboutyou" className="block mb-1 mt-4 text-sm font-medium text-gray-900 dark:text-white">{texts.aboutYouLabel}</label>
         
        <div className="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px] mb-8 md:mb-12"> 
                
                <textarea rows="4" type="text" value={noteToEdit.aboutyou || ''} onChange={handleChange} name="aboutyou" id="aboutyou" className=" input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit" placeholder={texts.homePageDescription} required />
            </div>

        <label for="githubname" className="block mb-1 mt-4 text-sm font-medium text-gray-900 dark:text-white">{texts.githubNameLabel}</label>
          
        <div className="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px] mb-8 md:mb-12"> 
                
                <input type="text" value={noteToEdit.githubname || ''} onChange={handleChange} id="githubname" name="githubname" aboutyou className="input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit" placeholder={texts.githubNameLabel} required />
            </div>
       

        <label for="twittername" className="block mb-1 mt-4 text-sm font-medium text-gray-900 dark:text-white">{texts.twitterNameLabel}</label>
         

        <div className="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px] mb-8 md:mb-12"> 
                
                <input type="text" value={noteToEdit.twittername || ''} onChange={handleChange} id="twittername" name="twittername" className="input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit" placeholder={texts.twitterNameLabel}required />
            </div>

        
        
           
  
    </form>
      )}
      </div>
  
  )
}

export default EditUser