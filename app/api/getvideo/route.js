import Core from '@alicloud/pop-core'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('videoId')

  if (!videoId) {
    return Response.json({ error: 'Video ID is required' }, { status: 400 })
  }

  const client = new Core({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    endpoint: 'https://vod.cn-shanghai.aliyuncs.com',
    apiVersion: '2017-03-21'
  })

  try {
    // Get both play auth and play info
    const [authResult, playResult] = await Promise.all([
      client.request('GetVideoPlayAuth', {
        VideoId: videoId,
        AuthTimeout: 7200
      }),
      client.request('GetPlayInfo', {
        VideoId: videoId,
        Formats: 'mp4',
        AuthTimeout: 7200,
        Definition: 'HD,SD'
      })
    ])

    return Response.json({
      playAuth: authResult.PlayAuth,
      playInfo: playResult.PlayInfoList,
      videoMeta: playResult.VideoBase
    })
  } catch (error) {
    console.error('Failed to get video info:', error)
    return Response.json({ 
      error: error.message,
      details: error.data || {} 
    }, { status: 500 })
  }
}