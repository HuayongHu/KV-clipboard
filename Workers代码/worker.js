addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { method } = request;

  // 使用您在控制面板中设置的变量名来引用KV命名空间
  const kvNamespace = await MY_KV_NAMESPACE;

  // 设置跨域访问头部
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // 在生产环境中，建议替换为特定的域名
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (method === 'OPTIONS') {
    // 处理预检请求
    return new Response(null, {
      headers: corsHeaders,
    });
  } else if (method === 'POST') {
    // 处理POST请求
    try {
      const { key, value } = await request.json();
      await kvNamespace.put(key, value);
      return new Response(JSON.stringify({ success: true, message: 'Data stored successfully' }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  } else if (method === 'GET') {
    // 处理GET请求
    try {
      let keys = await kvNamespace.list();
      let allData = {};
      for (let key of keys.keys) {
        allData[key.name] = await kvNamespace.get(key.name);
      }
      return new Response(JSON.stringify(allData), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  } else {
    return new Response('Method not allowed', {
      status: 405,
      headers: corsHeaders,
    });
  }
}
