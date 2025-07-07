-- Create form submissions table
DROP TABLE IF EXISTS form_submissions;
CREATE TABLE form_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  ip_address TEXT,
  is_read INTEGER DEFAULT 0
);

-- Create indexes
CREATE INDEX idx_form_submissions_email ON form_submissions(email);
CREATE INDEX idx_form_submissions_submitted_at ON form_submissions(submitted_at);
CREATE INDEX idx_form_submissions_is_read ON form_submissions(is_read); 