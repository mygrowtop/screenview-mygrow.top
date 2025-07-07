// API for retrieving form submission data
// Requires simple password protection

export async function onRequestGet(context) {
  try {
    // Simple password protection - in a real application, you should use more secure authentication methods
    const url = new URL(context.request.url);
    const password = url.searchParams.get("key");
    
    // Validate password - you can set the correct password in environment variables
    // This simple example uses a hardcoded password, but you should use environment variables
    const correctPassword = context.env.ADMIN_KEY || "screenview_admin";
    
    if (password !== correctPassword) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Unauthorized access" 
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
    
    // Get D1 database instance
    const db = context.env.CONTACT_DB;
    
    if (!db) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Database service not configured" 
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
    
    // Pagination parameters
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;
    
    // Query total count
    const countResult = await db.prepare("SELECT COUNT(*) as count FROM form_submissions").all();
    const totalItems = countResult.results[0].count;
    
    // Query data
    const { results } = await db.prepare(
      "SELECT * FROM form_submissions ORDER BY submitted_at DESC LIMIT ? OFFSET ?"
    ).bind(limit, offset).all();
    
    // Success response
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
    console.error("Error getting form submission data:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Error occurred while retrieving data" 
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

// Handle preflight requests
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