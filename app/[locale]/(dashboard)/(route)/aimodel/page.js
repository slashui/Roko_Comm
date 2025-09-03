"use client"
import { useTranslations } from "next-intl";
import { useState } from 'react';


const AI_PROVIDERS = {
  GPT: {
    provider: 'gpt',
    models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo-preview']
  },
  Claude: {
    provider: 'claude',
    models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229']
  },
  Gemini: {
    provider: 'gemini',
    models: [
      'gemini-1.5-pro-002',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.5-flash-002',
      'gemini-1.5-flash-8b'
    ]
  },
  Llama3: {
    provider: 'groq',
    models: [
      'llama-3.1-70b-versatile',
      'llama-3.1-8b-instant',
      'llama-3.2-11b-text-preview',
      'llama-3.2-11b-vision-preview',
      'llama-3.2-1b-preview',
      'llama-3.2-3b-preview',
      'llama-3.2-90b-text-preview',
      'llama-3.2-90b-vision-preview',
      'llama-guard-3-8b',
      'llama3-70b-8192',
      'llama3-8b-8192'
    ]
  }
};

export default function Aimodel() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleProviderChange = (e) => {
    const provider = e.target.value;
    setSelectedProvider(provider);
    setSelectedModel('');
  };

  const handleSubmit = async () => {
    if (!selectedProvider || !selectedModel || !userPrompt) {
      alert('Please fill in all required fields');
      return;
    }

    const requestData = {
      provider: AI_PROVIDERS[selectedProvider].provider,
      model: selectedModel,
      systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    };


    console.log('Request JSON:', JSON.stringify(requestData, null, 2));

    setIsLoading(true);
    try {
      const response = await fetch('https://www.oneday.build/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Response:', data);
      setResult(data.response || data.error || 'No response');

    } catch (error) {
      console.error('Error:', error);
      setResult('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="w-full flex text-left text-xs text-gray-500 gap-x-[11px] mb-[37px]">
        <h2 className="capitalize text-gray-1100  font-bold text-[28px] leading-[35px] dark:text-gray-dark-1100 mb-[13px]">AI Model</h2></div>



      <div className="flex pb-20 py-4 h-full items-start flex-row w-full max-w-6xl justify-center items-center  gap-6">

        <div className="w-1/2  h-full">
          <p class="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100">Select A AI Model</p>

          <select
            value={selectedProvider}
            onChange={handleProviderChange}
            className="px-4 py-2 border rounded-lg text-white bg-white/10 backdrop-blur-sm"
          >
            <option value="">Select Provider&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
            {Object.keys(AI_PROVIDERS).map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>

          {/* Model Selector */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-4 ml-2 py-2 border rounded-lg bg-white/10 text-white backdrop-blur-sm"
            disabled={!selectedProvider}
          >
            <option value="">Select Model&nbsp;&nbsp;&nbsp;</option>
            {selectedProvider &&
              AI_PROVIDERS[selectedProvider].models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>


          <div>
            <p class="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100 mt-6">
              System Prompt (Optional)
            </p>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/10 backdrop-blur-sm text-white"
              rows={3}
              placeholder="Enter system prompt..."
            />
          </div>

          {/* User Prompt */}
          <div>
            <p class="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100 mt-6">
              User Prompt
            </p>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-white bg-white/10 backdrop-blur-sm"
              rows={5}
              placeholder="Enter your message..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !selectedProvider || !selectedModel || !userPrompt}
            className="w-full px-4 py-2 bg-primary text-black rounded-lg hover:bg-blue-700 
                        disabled:bg-gray-400 disabled:cursor-not-allowed
                        transition-colors duration-200 mt-6"
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>

        </div>
        <div className="w-1/2 h-full self-start">
          <div className="h-full border h-[500px] bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl pt-[21px] px-[23px] pb-[34px]">
            <span className="text-gray-500 leading-4 font-semibold border-b border-neutral block dark:text-gray-dark-500 text-[14px] pb-[14px] dark:border-dark-neutral-border mb-[18px]">
              Response:
            </span>
            <div className="h-[370px] text-white">


              {result && (
                <div className=" whitespace-pre-wrap overflow-auto">
                  {result}
                </div>
              )}</div>

          </div>
        </div>
      </div>
    </div>

  )


}