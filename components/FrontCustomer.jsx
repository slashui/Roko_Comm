import React from 'react';
import { useTranslations } from "next-intl";
/**
 * Customer Testimonials Section
 * 
 * Displays customer reviews and logos in a responsive grid layout,
 * featuring testimonial cards and company branding.
 */




const Card = ({ company, category, description, logo, bgColor = 'bg-black', className = '' }) => {
  if (description) {
    return (
      <div className={`col-span-2 p-6 rounded-xl ${bgColor} text-black transition-transform hover:scale-[1.02] ${className}`}>


        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">{company}</span>
            <span className="text-gray-600">·</span>
            <span className="text-gray-600 text-sm">{category}</span>
          </div>
          <p className="text-xl font-medium mb-8">{description}</p>
          <div className="mt-auto">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div  className={`p-6 border border-white/10 rounded-xl bg-[url('/box_bg.png')]  flex items-center justify-center transition-transform  hover:scale-[1.02] ${className}`}>
      <img src={logo} alt={company} className="max-w-[160px] h-12 object-contain invert" style={{ filter: 'none' }} />
    </div>
  );
};

const FrontCustomer = () => {
  const t = useTranslations("Landing");
  const cards = [
    {
      company: 'Buddha Talk',
      category: t("Cus_cate1"),
      description: t("Cus_desc1"),
      bgColor: 'bg-violet-200',
      
    },
    {
      company: 'HuntFlow',
      logo: '/customer_logo_1.png'
    },
    {
      company: 'Paragram',
      logo: '/customer_logo_2.png'
    },
    {
      company: 'PMGenius',
      logo: '/customer_logo_8.svg'
    },
    {
      company: 'BuddhaTalks',
      logo: '/customer_logo_4.svg'
    },
    {
      company: 'HuntFlow',
      category: t("Cus_cate2"),
      description: t("Cus_desc2"),
      bgColor: 'bg-yellow-200',
      className: 'col-span-2'
    },
    {
      company: 'WebCreaf',
      category: t("Cus_cate3"),
      description: t("Cus_desc3"),
      bgColor: 'bg-white',
      className: 'col-span-2'
    },
    {
      company: 'WebCreaf',
      logo: '/customer_logo_5.svg'
    },
    {
      company: 'AI AGENT LAB',
      logo: '/customer_logo_6.svg'
    }
  ];

  return (
    <div className="bg-black p-4 sm:p-8 min-h-screen"> {/* 调整padding */}
      <h1 className='lg:text-5xl md:text-4xl text-3xl dark:text-white justify-center mx-auto flex font-inter text-center my-10 sm:my-20 flex-col'>
        <span>{t("Cus_title1")}</span>
        <span>{t("Cus_title2")} <span className='text-primary'>OneDay.Build</span>{t("Cus_title3")}</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            {...card} 
            className={`${card.className || ''} ${card.description ? 'col-span-2 md:col-span-2 lg:col-span-2' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FrontCustomer;