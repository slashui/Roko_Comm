'use client'

import { useState } from 'react'
import { Upload, FileText, X, Download } from 'lucide-react'

export default function AdminMaterialUploader({ 
  courseId, 
  chapterNumber, 
  lessonNumber,
  currentMaterials = [],
  onMaterialUpload
}) {
  const [uploading, setUploading] = useState(false)
  const [materials, setMaterials] = useState(currentMaterials)
  
  // 当lesson切换时，重新初始化materials
  const lessonKey = `${courseId}/${chapterNumber}-${lessonNumber}`
  const [currentLessonKey, setCurrentLessonKey] = useState(lessonKey)
  
  // 检测lesson变化，重新设置materials
  if (currentLessonKey !== lessonKey) {
    setCurrentLessonKey(lessonKey)
    setMaterials(currentMaterials)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return '📄'
    if (type?.includes('word') || type?.includes('document')) return '📝'
    if (type?.includes('excel') || type?.includes('sheet')) return '📊'
    if (type?.includes('powerpoint') || type?.includes('presentation')) return '📊'
    if (type?.includes('image')) return '🖼️'
    if (type?.includes('zip') || type?.includes('rar')) return '🗜️'
    return '📎'
  }

  const handleUpload = async (file) => {
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('material', file)
      formData.append('lessonId', `${courseId}/${chapterNumber}-${lessonNumber}`)

      const response = await fetch('/api/upload-material', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      
      if (result.success) {
        const newMaterial = {
          name: result.fileName,
          originalName: result.originalName,
          size: result.size,
          type: result.type,
          url: result.fileUrl,
          uploadedAt: new Date().toISOString()
        }
        
        const updatedMaterials = [...materials, newMaterial]
        setMaterials(updatedMaterials)
        
        // 回调通知父组件
        if (onMaterialUpload) {
          onMaterialUpload(updatedMaterials)
        }
      }

    } catch (error) {
      console.error('Upload error:', error)
      alert('课件上传失败: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const removeMaterial = (index) => {
    const updatedMaterials = materials.filter((_, i) => i !== index)
    setMaterials(updatedMaterials)
    if (onMaterialUpload) {
      onMaterialUpload(updatedMaterials)
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">课件附件</label>
      
      {/* 已上传的课件列表 */}
      {materials.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">已上传的课件 ({materials.length})</h4>
          {materials.map((material, index) => (
            <div key={index} className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex-shrink-0 mr-3 text-2xl">
                {getFileIcon(material.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {material.originalName}
                  </p>
                  <div className="flex items-center space-x-2">
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded"
                      title="下载"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => removeMaterial(index)}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                      title="删除"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                  <span>{formatFileSize(material.size)}</span>
                  <span>{new Date(material.uploadedAt).toLocaleString('zh-CN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* 上传区域 */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.png,.jpg,.jpeg,.txt"
          onChange={(e) => handleUpload(e.target.files[0])}
          className="hidden"
          id={`material-upload-${courseId}-${chapterNumber}-${lessonNumber}`}
          disabled={uploading}
        />
        
        <label
          htmlFor={`material-upload-${courseId}-${chapterNumber}-${lessonNumber}`}
          className="cursor-pointer block"
        >
          {uploading ? (
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <span className="text-blue-600 font-medium">上传中...</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <span className="text-gray-600 font-medium">点击上传课件文件</span>
                <p className="text-xs text-gray-500 mt-1">
                  支持 PDF, Word, PPT, Excel, 图片等格式，最大 10MB
                </p>
              </div>
            </div>
          )}
        </label>
      </div>

      {/* 调试信息 */}
      <div className="text-xs text-gray-400 p-2 bg-gray-50 rounded">
        课程ID: {courseId} | 章节: {chapterNumber} | 课时: {lessonNumber}
      </div>
    </div>
  )
}