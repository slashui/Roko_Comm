'use client'

import { useState } from 'react'
import { Upload, Video, X, Check } from 'lucide-react'

export default function AdminVideoUploader({ 
  courseId, 
  chapterNumber, 
  lessonNumber,
  currentVideoUrl = '',
  currentStreamId = '',
  currentThumbnail = '',
  onVideoUpload
}) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoData, setVideoData] = useState({
    videoUrl: currentVideoUrl,
    streamId: currentStreamId,
    thumbnail: currentThumbnail
  })
  
  // 当lesson切换时，重新初始化videoData
  const lessonKey = `${courseId}/${chapterNumber}-${lessonNumber}`
  const [currentLessonKey, setCurrentLessonKey] = useState(lessonKey)
  
  // 检测lesson变化，重新设置videoData
  if (currentLessonKey !== lessonKey) {
    setCurrentLessonKey(lessonKey)
    setVideoData({
      videoUrl: currentVideoUrl,
      streamId: currentStreamId,
      thumbnail: currentThumbnail
    })
  }

  const handleUpload = async (file) => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('video', file)
      formData.append('lessonId', `${courseId}/${chapterNumber}-${lessonNumber}`)

      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      
      if (result.success) {
        const newVideoData = {
          videoUrl: result.videoUrl,
          streamId: result.streamId,
          thumbnail: result.thumbnail
        }
        
        setVideoData(newVideoData)
        
        // 回调通知父组件
        if (onVideoUpload) {
          onVideoUpload(newVideoData)
        }
      }

    } catch (error) {
      console.error('Upload error:', error)
      alert('视频上传失败: ' + error.message)
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const clearVideo = () => {
    const clearedData = {
      videoUrl: '',
      streamId: '',
      thumbnail: ''
    }
    setVideoData(clearedData)
    if (onVideoUpload) {
      onVideoUpload(clearedData)
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">课时视频</label>
      
      {videoData.videoUrl ? (
        // 显示已上传的视频信息
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-green-700">
              <Video className="w-5 h-5 mr-2" />
              <span className="font-medium">视频已上传</span>
            </div>
            <button
              onClick={clearVideo}
              className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
              title="删除视频"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">视频已成功上传</span>
            </div>
          </div>
          
          {/* 视频预览 */}
          <div className="mt-3">
            <iframe
              src={`https://iframe.cloudflarestream.com/${videoData.streamId}`}
              className="w-full aspect-video rounded border"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              title="Video Preview"
            />
          </div>
        </div>
      ) : (
        // 上传区域
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleUpload(e.target.files[0])}
            className="hidden"
            id={`video-upload-${courseId}-${chapterNumber}-${lessonNumber}`}
            disabled={uploading}
          />
          
          <label
            htmlFor={`video-upload-${courseId}-${chapterNumber}-${lessonNumber}`}
            className="cursor-pointer block"
          >
            {uploading ? (
              <div className="space-y-3">
                <div className="relative w-20 h-20 mx-auto">
                  {/* 圆形进度指示器背景 */}
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                  {/* 圆形进度指示器 */}
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
                    style={{
                      background: `conic-gradient(from 0deg, #2563eb ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`
                    }}
                  ></div>
                  {/* 中心图标 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  {/* 进度百分比 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600 mt-8">{progress}%</span>
                  </div>
                </div>
                <span className="text-blue-600 font-medium">上传中...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <Video className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <span className="text-gray-600 font-medium">点击上传视频文件</span>
                  <p className="text-xs text-gray-500 mt-1">
                    支持 MP4, MOV, AVI 等格式，最大 500MB
                  </p>
                </div>
              </div>
            )}
          </label>
        </div>
      )}


    </div>
  )
}