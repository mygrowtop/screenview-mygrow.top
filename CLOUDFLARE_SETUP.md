# Cloudflare Pages 设置指南

本项目使用 Cloudflare Pages Functions 和 D1 数据库来处理和存储表单提交。以下是设置步骤：

## 1. 创建 D1 数据库

1. 登录到 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在左侧菜单中，选择 **Workers & Pages**
3. 选择 **D1** 选项卡
4. 点击 **创建数据库** 按钮
5. 输入数据库名称: `screenview_contacts`
6. 点击 **创建** 按钮

## 2. 初始化数据库表

1. 创建数据库后，进入数据库详情页面
2. 复制数据库 ID (将在下一步使用)
3. 点击 **查询** 按钮
4. 复制并粘贴 `db/schema.sql` 中的SQL到查询编辑器中
5. 点击 **运行查询** 按钮

## 3. 更新 wrangler.toml 配置

1. 打开 `wrangler.toml` 文件
2. 将复制的数据库 ID 粘贴到 `database_id = ""` 中

```toml
[[d1_databases]]
binding = "CONTACT_DB"
database_name = "screenview_contacts"
database_id = "粘贴你的数据库ID到这里"
```

## 4. 绑定数据库到 Pages 项目

1. 在 Cloudflare Dashboard 中，转到 **Workers & Pages** > **Pages**
2. 选择你的项目
3. 点击 **设置** > **Functions**
4. 在 **D1 数据库绑定** 部分，点击 **添加绑定**
5. 变量名称填写: `CONTACT_DB`
6. 选择你创建的 `screenview_contacts` 数据库
7. 点击 **保存**

## 5. 重新部署项目

1. 在你的项目页面，点击 **部署** > **部署到生产环境**
2. 等待部署完成

## 6. 查看表单提交数据

用户提交表单后，数据会存储在 D1 数据库中。你可以通过以下步骤查看数据：

1. 在 Cloudflare Dashboard 中，转到 **Workers & Pages** > **D1**
2. 选择 `screenview_contacts` 数据库
3. 点击 **查询** 按钮
4. 输入并运行以下SQL查询来查看提交的表单：

```sql
SELECT * FROM form_submissions ORDER BY submitted_at DESC;
```

## 7. 故障排除

如果表单提交不成功，请检查：

1. Cloudflare Pages 日志中是否有错误信息
2. D1 数据库是否正确绑定到 Pages 项目
3. 数据库表是否已正确创建 