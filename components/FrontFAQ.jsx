"use client"
import { faqs } from "@/libs/faqs";
import AccordionItem from "./FAQAccordionItem";
import { useState } from "react";
import React, { useEffect, useRef } from 'react';
import { useTranslations } from "next-intl";


/**
 * FAQ Section Component
 * 
 * Displays frequently asked questions in an expandable accordion format
 * with smooth animations and styled UI elements.
 */



const FrontFAQ = () => {
  const t = useTranslations("Landing");
  const faqData = [
    {
      question: t("question1"),
      answer: t("answer1")
    },
    {
      question: t("question2"),
      answer: t("answer2")
    },
    {
      question: t("question3"),
      answer: t("answer3")
    },
    {
      question: t("question4"),
      answer: t("answer4")
    },
    {
      question: t("question5"),
      answer: t("answer5")
    },
    {
      question: t("question6"),
      answer: t("answer6")
    }
   
  ];
  

 const handleToggle = (index) => {
  if (clicked === index) {
   return setClicked("0");
  }
  setClicked(index);
 };

  return (
    <div id="faq" className="w-full flex flex-col justify-center items-center rounded-lg">
   
      <ul className="max-w-screen-lg mx-6 " id="faq">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} faq={faq} />

          ))}
      </ul>
    </div>
  );
}

export default FrontFAQ