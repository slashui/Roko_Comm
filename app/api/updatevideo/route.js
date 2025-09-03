import Core from '@alicloud/pop-core'

export async function POST(request) {
  const { title = '未命名视频', fileName } = await request.json()

  const client = new Core({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    endpoint: 'https://vod.cn-shanghai.aliyuncs.com',  // Added https://
    apiVersion: '2017-03-21'
  })

  try {
    const result = await client.request('CreateUploadVideo', {
      Title: title,
      FileName: fileName,
      CoverURL: '',
      Description: '',
      Tags: ''
    })

    return Response.json({
      uploadAuth: result.UploadAuth,
      uploadAddress: result.UploadAddress,
      videoId: result.VideoId
    })
  } catch (error) {
    console.error('获取上传凭证失败:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}