# Cloudflare Pages 设置指南

本项目使用 Cloudflare Pages Functions 来处理表单提交。为了确保功能正常工作，请按照以下步骤进行设置：

## 环境变量设置

在 Cloudflare Pages 项目的 Settings > Environment variables 中，添加以下环境变量：

1. `SENDGRID_API_KEY` - 你的 SendGrid API 密钥
   - 生产和预览环境都需要添加

## SendGrid 配置

1. 注册 SendGrid 账户：https://sendgrid.com/
2. 在 SendGrid 控制台创建 API 密钥
3. 验证你的发件人邮箱或域名
4. 将 API 密钥添加到 Cloudflare Pages 环境变量中

## 验证部署

部署完成后，你可以通过访问以下路径来测试 Functions 是否正常工作：

- `/` - 应显示 "Cloudflare Pages Functions is working!"
- `/api/submit-form` - 应该只接受 POST 请求

## 表单提交

如果一切配置正确，当用户提交联系表单时，数据会通过 SendGrid 发送到你的邮箱 (aass0810@gmail.com)。

## 故障排除

如果表单提交不成功，请检查：

1. Cloudflare Pages 日志中是否有错误信息
2. SendGrid API 密钥是否正确配置
3. 发件人邮箱是否已通过验证 