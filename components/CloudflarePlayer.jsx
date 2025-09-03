'use client'
import { useRef, useEffect, useState } from 'react';

const CloudflarePlayer = ({ videoUrl, streamId, thumbnail, className = "" }) => {
  const playerRef = useRef(null);
  const [videoError, setVideoError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 调试信息
  console.log('CloudflarePlayer props:', { videoUrl, streamId, thumbnail });
  
  if (!videoUrl && !streamId) {
    console.log('CloudflarePlayer: No video data available')
  }

  // 简化的URL验证，不测试manifest URL的可访问性
  useEffect(() => {
    if (videoUrl) {
      // 简单的URL格式检查
      if (!videoUrl.includes('cloudflarestream.com')) {
        setVideoError('无效的Cloudflare Stream URL格式')
        setIsLoading(false)
        return
      }
      // 不测试manifest URL，因为它可能返回404但iframe仍然可用
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [videoUrl])

  // 不再使用复杂的SDK加载，直接使用iframe

  // 从videoUrl中提取streamId的辅助函数
  const extractStreamIdFromUrl = (url) => {
    if (!url) return null;
    // 匹配 Cloudflare Stream URL 格式
    // https://customer-xxx.cloudflarestream.com/STREAM_ID/manifest/video.m3u8
    const match = url.match(/cloudflarestream\.com\/([^\/]+)\//);
    return match ? match[1] : null;
  };

  // 如果没有视频URL，显示占位符
  if (!videoUrl) {
    return (
      <div className={`w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-2">📹</div>
          <p className="text-gray-500">暂无视频内容</p>
        </div>
      </div>
    );
  }

  const currentStreamId = streamId || extractStreamIdFromUrl(videoUrl);

  // 检测视频格式的辅助函数
  const getVideoType = (url) => {
    if (!url) return 'video/mp4';
    if (url.includes('.m3u8')) return 'application/x-mpegURL';
    if (url.includes('.mp4')) return 'video/mp4';
    if (url.includes('.webm')) return 'video/webm';
    if (url.includes('.ogg')) return 'video/ogg';
    return 'video/mp4'; // 默认为mp4
  };

  // 如果无法获取streamId，使用HTML5视频播放器作为后备
  if (!currentStreamId) {
    return (
      <div className={`w-full aspect-video ${className}`}>
        <video
          className="w-full h-full rounded-lg"
          controls
          preload="metadata"
          poster={thumbnail}
        >
          <source src={videoUrl} type={getVideoType(videoUrl)} />
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
            <p className="text-xs text-gray-500">错误: {videoError}</p>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://iframe.cloudflarestream.com/${currentStreamId}`}
          className="w-full h-full rounded-lg border-0"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          title="Cloudflare Stream Player"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setVideoError('Iframe加载失败')
            setIsLoading(false)
          }}
        />
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

export default CloudflarePlayer;