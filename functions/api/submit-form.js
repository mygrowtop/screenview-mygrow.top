// Cloudflare Pages Function to handle form submissions
// 使用D1数据库存储表单提交数据

export async function onRequestPost(context) {
  try {
    // 获取表单JSON数据
    const { name, email, subject, message } = await context.request.json();
    
    // 验证表单数据
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Missing required fields" 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // 获取D1数据库实例
    const db = context.env.CONTACT_DB;
    
    if (!db) {
      console.error("D1数据库未配置");
      return new Response(JSON.stringify({ 
        success: false, 
        error: "数据库服务未配置" 
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // 将表单数据插入数据库
    await db.prepare(
      "INSERT INTO form_submissions (name, email, subject, message, submitted_at, ip_address) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(
      name,
      email,
      subject || "无主题",
      message,
      new Date().toISOString(),
      context.request.headers.get("CF-Connecting-IP") || "unknown"
    ).run();
    
    // 成功响应
    return new Response(JSON.stringify({ 
      success: true,
      message: "表单提交成功" 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error("表单提交错误:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: "处理提交时发生错误" 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}

// 处理预检请求
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
} 