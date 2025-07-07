// Cloudflare Pages Function to handle form submissions
// 你需要在Cloudflare的环境变量中设置SENDGRID_API_KEY

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
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 构建发送给收件人的邮件内容
    const formattedSubject = subject ? subject : "New contact form submission";
    const emailContent = `
      Name: ${name}
      Email: ${email}
      Subject: ${formattedSubject}
      Message: ${message}
    `;
    
    // SendGrid API集成
    // 注意：你需要在Cloudflare Pages的环境变量中设置SENDGRID_API_KEY
    const SENDGRID_API_KEY = context.env.SENDGRID_API_KEY;
    
    if (!SENDGRID_API_KEY) {
      console.error("SendGrid API key not configured");
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Email service not configured" 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: "aass0810@gmail.com", name: "ScreenView Admin" }]
        }],
        from: { email: "no-reply@screenview.app", name: "ScreenView Contact Form" },
        reply_to: { email: email, name: name },
        subject: `ScreenView Contact: ${formattedSubject}`,
        content: [{
          type: "text/plain",
          value: emailContent
        }]
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid API error:", errorText);
      throw new Error("Failed to send email");
    }
    
    // 成功响应
    return new Response(JSON.stringify({ 
      success: true,
      message: "Form submitted successfully" 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error("Form submission error:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: "An error occurred while processing your submission" 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 