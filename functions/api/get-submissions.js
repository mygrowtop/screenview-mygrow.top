// 获取表单提交数据的API
// 需要简单的密码保护

export async function onRequestGet(context) {
  try {
    // 简单的密码保护 - 在实际应用中应该使用更安全的身份验证方法
    const url = new URL(context.request.url);
    const password = url.searchParams.get("key");
    
    // 验证密码 - 你可以在环境变量中设置正确的密码
    // 这个简单示例使用硬编码密码，但你应该使用环境变量
    const correctPassword = context.env.ADMIN_KEY || "screenview_admin";
    
    if (password !== correctPassword) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "未授权访问" 
      }), {
        status: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // 获取D1数据库实例
    const db = context.env.CONTACT_DB;
    
    if (!db) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "数据库服务未配置" 
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // 分页参数
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;
    
    // 查询总数
    const countResult = await db.prepare("SELECT COUNT(*) as count FROM form_submissions").all();
    const totalItems = countResult.results[0].count;
    
    // 查询数据
    const { results } = await db.prepare(
      "SELECT * FROM form_submissions ORDER BY submitted_at DESC LIMIT ? OFFSET ?"
    ).bind(limit, offset).all();
    
    // 成功响应
    return new Response(JSON.stringify({ 
      success: true,
      data: {
        submissions: results,
        pagination: {
          page,
          limit,
          totalItems,
          totalPages: Math.ceil(totalItems / limit)
        }
      }
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error("获取表单提交数据错误:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: "获取数据时发生错误" 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
} 