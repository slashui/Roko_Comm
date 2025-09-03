
import { useTranslations } from "next-intl";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FrontFeatures from '@/components/FrontFeatures';
import FrontStepper from '@/components/FrontStepper';
import FrontAboutme from '@/components/FrontAboutme';
import FrontPrice from '@/components/FrontPrice';
import FrontFooter from '@/components/FrontFooter';
import FrontFAQ from '@/components/FrontFAQ';
import FrontWaitlist from '@/components/FrontWaitlist';

export default function Home() {
  const t = useTranslations("Index");
  const session = getServerSession(authOptions);
  
  

  // fetchAndPrintSession();
  return (
    <>
    {/* <div className='w-full bg-primary dark:bg-black'><FrontHero /></div> */}
    <FrontWaitlist />
    <FrontFeatures />
   <FrontStepper />
    <FrontAboutme />
    {/* <FrontPrice /> */}
    <FrontFAQ />
    <FrontFooter />

   

  </>
  )
}
