import { useState } from "react";
import { useRef } from "react";


/**
 * FAQ Accordion Item Component
 * 
 * This component renders an individual FAQ item in an accordion format.
 * Key features include:
 * 1. Expandable/collapsible content section
 * 2. Smooth animation transitions
 * 3. Dynamic height adjustment based on content
 * 4. Visual indicators for expanded/collapsed state
 * 
 * The component accepts:
 * - faq: An object containing:
 *   - question: The FAQ question text
 *   - answer: The FAQ answer text
 * 
 * UI Elements:
 * - Toggle button with +/- indicator
 * - Animated content wrapper
 * - Styled question and answer sections
 * - Hover effects and active states
 */


const AccordionItem = ({ faq }) => {

  const [clicked, setClicked] = useState(false);
  const contentEl = useRef();

  const { question, answer } = faq;

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <li className={`border-b border-zinc-700 ${clicked ? "active" : ""}`}>
      <button className="bg-gradient-to-b p-4 w-full text-left flex items-center text-zinc-900 md:text-xl text-lg hover:bg-black/10" onClick={handleToggle}>      <div className="text-2xl h-8 w-8  text-primary flex-shrink-0">
        {clicked ? "👇" : "👉"}
      </div>
      <span>{question}</span>
    </button>
  
    <div
      ref={contentEl}
      className="answer_wrapper"
      style={
        clicked
          ? { height: contentEl.current.scrollHeight }
          : { height: "0px" }
      }
    >
      <div className=" pb-6 px-4 ml-10 text-zinc-600  text-lg text-left">
        {answer}
      </div>
    </div>
  </li>
  );
};

export default AccordionItem;
