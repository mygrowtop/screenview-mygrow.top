// Cloudflare Pages Function to handle form submissions
// Using D1 database to store form submissions

export async function onRequestPost(context) {
  try {
    // Get form JSON data
    const { name, email, subject, message } = await context.request.json();
    
    // Validate form data
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
    
    // Get D1 database instance
    const db = context.env.CONTACT_DB;
    
    if (!db) {
      console.error("D1 database not configured");
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Database service not configured" 
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
    
    // Insert form data into database
    await db.prepare(
      "INSERT INTO form_submissions (name, email, subject, message, submitted_at, ip_address) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(
      name,
      email,
      subject || "No Subject",
      message,
      new Date().toISOString(),
      context.request.headers.get("CF-Connecting-IP") || "unknown"
    ).run();
    
    // Success response
    return new Response(JSON.stringify({ 
      success: true,
      message: "Form submitted successfully" 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error("Form submission error:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Error processing submission" 
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

// Handle preflight requests
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