'use client'
import { useRef, useEffect } from 'react';

const AliPlayer = ({ vid }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const updateIframeHeight = () => {
      if (iframeRef.current) {
        const width = iframeRef.current.offsetWidth;
        iframeRef.current.style.height = `${width * 9 / 16}px`;
      }
    };

    window.addEventListener('resize', updateIframeHeight);
    updateIframeHeight();

    return () => window.removeEventListener('resize', updateIframeHeight);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={`/aliplayer.html?vid=${vid}`}  // 传递 vid 而不是 url
      className="w-full border-0 rounded-lg"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default AliPlayer;