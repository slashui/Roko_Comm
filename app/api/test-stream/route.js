export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const streamId = searchParams.get('streamId') || 'f7937fff0a874e5b994ea3a3fefc3863';

  try {
    const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const cfApiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!cfAccountId || !cfApiToken) {
      return Response.json({ 
        error: 'Missing CloudFlare credentials',
        accountId: !!cfAccountId,
        apiToken: !!cfApiToken
      }, { status: 500 });
    }

    // 获取视频信息
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/stream/${streamId}`, {
      headers: {
        'Authorization': `Bearer ${cfApiToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json({ 
        error: 'Failed to fetch video info',
        status: response.status,
        message: errorText
      }, { status: response.status });
    }

    const videoInfo = await response.json();

    return Response.json({
      success: true,
      streamId,
      videoInfo: videoInfo.result,
      playbackUrls: {
        iframe: `https://iframe.cloudflarestream.com/${streamId}`,
        dash: `https://customer-${cfAccountId}.cloudflarestream.com/${streamId}/manifest/video.mpd`,
        hls: `https://customer-${cfAccountId}.cloudflarestream.com/${streamId}/manifest/video.m3u8`
      }
    });

  } catch (error) {
    console.error('Test stream error:', error);
    return Response.json({ 
      error: error.message,
      streamId 
    }, { status: 500 });
  }
}