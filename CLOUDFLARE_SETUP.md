# Cloudflare Pages Setup Guide

This project uses Cloudflare Pages Functions and D1 database to process and store form submissions. Here are the setup steps:

## 1. Create D1 Database

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. In the left menu, select **Workers & Pages**
3. Select the **D1** tab
4. Click the **Create database** button
5. Enter database name: `screenview_contacts`
6. Click the **Create** button

## 2. Initialize Database Tables

1. After creating the database, go to the database details page
2. Copy the database ID (will be used in the next step)
3. Click the **Query** button
4. Copy and paste the SQL from `db/schema.sql` into the query editor
5. Click the **Run query** button

## 3. Update wrangler.toml Configuration

1. Open the `wrangler.toml` file
2. Paste the copied database ID into `database_id = ""`

```toml
[[d1_databases]]
binding = "CONTACT_DB"
database_name = "screenview_contacts"
database_id = "paste your database ID here"
```

## 4. Bind Database to Pages Project

1. In Cloudflare Dashboard, go to **Workers & Pages** > **Pages**
2. Select your project
3. Click **Settings** > **Functions**
4. In the **D1 Database Bindings** section, click **Add binding**
5. Enter variable name: `CONTACT_DB`
6. Select the `screenview_contacts` database you created
7. Click **Save**

## 5. Redeploy Project

1. On your project page, click **Deployments** > **Deploy to production**
2. Wait for the deployment to complete

## 6. View Form Submission Data

After users submit forms, data is stored in the D1 database. You can view the data using these steps:

1. In Cloudflare Dashboard, go to **Workers & Pages** > **D1**
2. Select the `screenview_contacts` database
3. Click the **Query** button
4. Enter and run the following SQL query to view form submissions:

```sql
SELECT * FROM form_submissions ORDER BY submitted_at DESC;
```

## 7. Troubleshooting

If form submissions are not successful, check:

1. Cloudflare Pages logs for error messages
2. Whether the D1 database is correctly bound to the Pages project
3. Whether the database tables have been created correctly 