import Core from '@alicloud/pop-core'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('vid')

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
    const result = await client.request('GetVideoPlayAuth', {
      VideoId: videoId,
      AuthTimeout: 7200
    })

    return Response.json({
      playauth: result.PlayAuth,
      videoMeta: result.VideoBase || {}
    })
  } catch (error) {
    console.error('Failed to get video play auth:', error)
    return Response.json({ 
      error: error.message,
      code: error.code,
      requestId: error.requestId
    }, { status: 500 })
  }
}
