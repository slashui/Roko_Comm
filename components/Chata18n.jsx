"use client"
import { useChat, Message } from "ai/react";
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * AI Chat Assistant Component
 * 
 * This component implements a chat interface powered by an AI assistant.
 * Key features include:
 * 1. Real-time chat interaction with an AI assistant
 * 2. Automatic message history tracking and display
 * 3. Markdown rendering support for formatted responses
 * 4. Code syntax highlighting for code blocks
 * 5. Auto-resizing textarea for user input
 * 
 * The component uses:
 * - Vercel AI SDK for chat functionality
 * - ReactMarkdown for rendering formatted messages
 * - SyntaxHighlighter for code block formatting
 * - Custom styling for a modern chat interface
 * 
 * The assistant is configured with a collegiate personality and broad knowledge base
 * to provide helpful responses to user queries across various topics.
 */


const CodeBlock = ({ language, value }) => {
    return (
      <SyntaxHighlighter style={atomDark} language={language} >
        {value}
      </SyntaxHighlighter>
    );
  };

export default function ChatAssistant() {
    // Vercel AI SDK (ai package) useChat()


    const [roleprompt, setRoleprompt] = ["You are a very collegiate assistant and know everything, so you will be asked any question and you will have to answer it.", undefined];
    const { messages, input, handleInputChange, handleSubmit } = useChat({

        body: { roleprompt },
    })

      
      const renderers = {
        code: CodeBlock,
      };
    // messages -> [user asks a question, gpt-4 response, user asks again, gpt-4 responds]

    console.log(messages);
    console.log(input);

    return (

                <div className="flex-1 border-r border-gray-200 border-zinc-700 h-full flex flex-col">
                    
                    <div className="flex flex-row w-full h-14 border-b border-gray-200 dark:border-zinc-700 flex-none">
                            <div className="flex-1 flex flex-row">
                            <div className="flex-none p-2">
                                <img src="/avtar/3.svg" width="40px" className="rounded-full" alt="" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex text-xl text-white pt-1">Mr.Lee</div>
                                <div className="flex text-sm text-gray-500">Assistant</div>
                            </div>
                            </div>
                            <div className="flex-none w-12 ">
                           
                            </div>
                        </div>
                        <div className=" flex-auto overflow-y-auto flex-col mt-4">

            {messages.map((message) => {
                return (

                    

                    <div key={message.id}  >
                        

                    
                        {
                            message.role === "assistant"
                            ?
                            <div className="flex items-start mb-6 mx-4">
                        
                            <div className="flex flex-col ">
                            
                            <div className="min-h-[85px] max-w-[900px] rounded-b-xl rounded-tr-xl bg-[#5B3CF4] p-4 text-white sm:min-h-0">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} >
                                {message.content.split("\n").map((currentTextBlock, index) => {
                                    if (currentTextBlock === "") {
                                    return "&nbsp;"; 
                                    } else {
                                    return currentTextBlock; 
                                    }
                                }).join('\n')}
                                </ReactMarkdown>
                            </div>
                                </div>
                                </div>
                            
                            :
                            <div className="flex flex-col items-start mb-6 mx-4">   
                                <div className=" rounded-b-xl max-w-[900px] rounded-tl-xl bg-zinc-500/20 text-white p-4 max-w-md">
                                

                                
                                
                                
                                {message.content.split("\n").map((currentTextBlock, index) => {
                            if(currentTextBlock === "") {
                                return <p key={message.id + index}>&nbsp;</p> 
                            } else {
                                return <p key={message.id + index}>{currentTextBlock}</p>
                            }
                        })}
                            </div></div>
                        }
                        
                    </div>

                )
            })}
            </div>
            <div className="flex-none ">
                <form className="m-2"  onSubmit={handleSubmit}>
                <label htmlFor="chat-input" className="sr-only">Enter your prompt</label>
                <div className="relative w-[full] ">
                    
                    
                    <TextareaAutosize minRows={1} maxRows={6} id="chat-input"
                    className="block w-full resize-none h-[55px] rounded-xl border-none border border-zinc-700 bg-zinc-800 p-4 pl-4 pr-20 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-white sm:text-base"
                    placeholder="Enter your prompt"
                    required
                    value={input}
                    onChange={handleInputChange} />
                    <button
                    type="submit"
                    className="absolute  bg-primary hover:bg-primary/80 bottom-2 right-2.5 rounded-lg px-4 py-2 text-sm font-medium text-black focus:outline-none focus:ring-4 focus:ring-[#6759FF]  sm:text-base"
                    >
                    Send <span className="sr-only">Send message</span>
                    </button>
                </div>
                </form>


                </div>
                </div>   
            
        
        
    )
    
       
}