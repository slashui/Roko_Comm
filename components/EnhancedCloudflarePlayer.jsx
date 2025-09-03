'use client'
import { useRef, useEffect, useState } from 'react';

const EnhancedCloudflarePlayer = ({ videoUrl, streamId, thumbnail, className = "" }) => {
  const playerRef = useRef(null);
  const [videoError, setVideoError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});
  const [useHtmlVideo, setUseHtmlVideo] = useState(false);
  
  // 调试信息
  console.log('EnhancedCloudflarePlayer props:', { videoUrl, streamId, thumbnail });

  // 从videoUrl中提取streamId的辅助函数
  const extractStreamIdFromUrl = (url) => {
    if (!url) return null;
    const match = url.match(/cloudflarestream\.com\/([^\/]+)\//);
    return match ? match[1] : null;
  };

  const currentStreamId = streamId || extractStreamIdFromUrl(videoUrl);

  useEffect(() => {
    setDebugInfo({
      originalVideoUrl: videoUrl,
      originalStreamId: streamId,
      extractedStreamId: extractStreamIdFromUrl(videoUrl),
      finalStreamId: currentStreamId,
      iframeUrl: currentStreamId ? `https://iframe.cloudflarestream.com/${currentStreamId}` : null,
      m3u8Url: videoUrl && videoUrl.includes('.m3u8') ? videoUrl : null
    });
  }, [videoUrl, streamId, currentStreamId]);

  // 如果没有视频数据，显示占位符
  if (!videoUrl && !streamId) {
    return (
      <div className={`w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-2">📹</div>
          <p className="text-gray-500">暂无视频内容</p>
        </div>
      </div>
    );
  }

  // 检测视频格式的辅助函数
  const getVideoType = (url) => {
    if (!url) return 'video/mp4';
    if (url.includes('.m3u8')) return 'application/x-mpegURL';
    if (url.includes('.mp4')) return 'video/mp4';
    if (url.includes('.webm')) return 'video/webm';
    if (url.includes('.ogg')) return 'video/ogg';
    return 'video/mp4';
  };

  // 切换到HTML5播放器
  const switchToHtmlVideo = () => {
    setUseHtmlVideo(true);
    setVideoError(null);
    setIsLoading(false);
  };

  // 如果选择使用HTML5播放器或者没有streamId
  if (useHtmlVideo || !currentStreamId) {
    return (
      <div className={`w-full aspect-video ${className}`}>
        <video
          ref={playerRef}
          className="w-full h-full rounded-lg"
          controls
          preload="metadata"
          poster={thumbnail}
          onError={(e) => {
            console.error('HTML5 video error:', e);
            setVideoError(`视频播放错误: ${e.target.error?.message || 'Unknown error'}`);
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoadedData={() => setIsLoading(false)}
        >
          {videoUrl && (
            <source src={videoUrl} type={getVideoType(videoUrl)} />
          )}
          <p>您的浏览器不支持视频播放。</p>
        </video>
      </div>
    );
  }

  return (
    <div className={`w-full aspect-video relative ${className}`}>
      {videoError ? (
        <div className="w-full h-full bg-red-50 rounded-lg flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">⚠️</div>
            <p className="text-red-600 mb-2">视频加载失败</p>
            <p className="text-xs text-gray-500 mb-3">错误: {videoError}</p>
            
            <button
              onClick={switchToHtmlVideo}
              className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              重新加载
            </button>
          </div>
        </div>
      ) : (
        <>
          <iframe
            src={`https://iframe.cloudflarestream.com/${currentStreamId}`}
            className="w-full h-full rounded-lg border-0"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            title="Cloudflare Stream Player"
            onLoad={() => {
              console.log('Cloudflare iframe loaded successfully');
              setIsLoading(false);
            }}
            onError={(e) => {
              console.error('Cloudflare iframe error:', e);
              setVideoError('Cloudflare Stream iframe加载失败');
              setIsLoading(false);
            }}
          />
          

        </>
      )}
      
      {isLoading && !videoError && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">加载视频中...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCloudflarePlayer;