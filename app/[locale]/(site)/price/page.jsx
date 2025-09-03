import Image from 'next/image'
import { useTranslations } from "next-intl";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import FrontPrice from '@/components/FrontPrice';


export default function Home() {
  const t = useTranslations("Index");
  const session = getServerSession(authOptions);
  return (
    <>

    <FrontPrice />



  </>
  )
}