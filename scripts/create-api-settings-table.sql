-- API Settings Table for storing API keys and configuration
-- Run this script to create the api_settings table

CREATE TABLE IF NOT EXISTS api_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    is_encrypted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on setting_key for faster lookups
CREATE INDEX IF NOT EXISTS idx_api_settings_key ON api_settings(setting_key);

-- Insert default keys (empty values - to be filled by user)
INSERT INTO api_settings (setting_key, description) VALUES
    ('openai_api_key', 'OpenAI API key for AI features'),
    ('twilio_account_sid', 'Twilio Account SID for VoIP'),
    ('twilio_auth_token', 'Twilio Auth Token for VoIP'),
    ('twilio_phone_number', 'Twilio phone number'),
    ('docusign_client_id', 'DocuSign Client ID for e-signature'),
    ('docusign_client_secret', 'DocuSign Client Secret'),
    ('docusign_base_url', 'DocuSign base URL'),
    ('sendgrid_api_key', 'SendGrid API key for email campaigns'),
    ('clearbit_api_key', 'Clearbit API key for company research')
ON CONFLICT (setting_key) DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_api_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER api_settings_updated_at
BEFORE UPDATE ON api_settings
FOR EACH ROW
EXECUTE FUNCTION update_api_settings_timestamp();

-- Grant permissions (adjust user as needed)
-- GRANT SELECT, INSERT, UPDATE ON api_settings TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE api_settings_id_seq TO your_app_user;

