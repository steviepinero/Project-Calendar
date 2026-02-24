/**
 * Database Schema Initialization Script
 * Run this once to set up all tables and initial data
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const initDb = async () => {
    try {
        console.log('🔄 Initializing database...');

        // 1. Create database if it doesn't exist
        await pool.query(`
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = '${process.env.DB_NAME}'
            AND pid <> pg_backend_pid();
        `);

        await pool.query(`CREATE DATABASE ${process.env.DB_NAME};`);
        console.log(`✅ Database ${process.env.DB_NAME} created`);

        // Close connection and reconnect to new database
        await pool.end();

        const newPool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        // 2. Create tables
        console.log('🔄 Creating tables...');

        // Users table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                full_name VARCHAR(255),
                role VARCHAR(50) DEFAULT 'user',
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Users table created');

        // Team members table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS team_members (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                role VARCHAR(100),
                color_gradient VARCHAR(50),
                max_daily_hours DECIMAL(5, 2) DEFAULT 8,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Team members table created');

        // Projects table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL,
                description TEXT,
                type VARCHAR(50),
                status VARCHAR(50) DEFAULT 'On Track',
                assigned_to UUID REFERENCES team_members(id),
                duration_hours DECIMAL(8, 2),
                daily_limit DECIMAL(5, 2),
                start_date DATE,
                end_date DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Projects table created');

        // Tasks table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                status VARCHAR(50) DEFAULT 'pending',
                assigned_to UUID REFERENCES team_members(id),
                duration_hours DECIMAL(8, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Tasks table created');

        // Call history table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS call_history (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                from_number VARCHAR(20),
                to_number VARCHAR(20) NOT NULL,
                call_type VARCHAR(20),
                duration_seconds INTEGER,
                status VARCHAR(50),
                recording_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Call history table created');

        // Contacts table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                phone_number VARCHAR(20) UNIQUE NOT NULL,
                name VARCHAR(255),
                description TEXT,
                is_favorite BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Contacts table created');

        // Email campaigns table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS email_campaigns (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL,
                subject VARCHAR(255) NOT NULL,
                template_id UUID,
                contact_list_id UUID,
                status VARCHAR(50) DEFAULT 'draft',
                recipients_count INTEGER,
                sent_date TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Email campaigns table created');

        // E-signature documents table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS e_signature_documents (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL,
                document_type VARCHAR(100),
                signer_email VARCHAR(255),
                status VARCHAR(50) DEFAULT 'draft',
                envelope_id VARCHAR(255),
                document_url VARCHAR(500),
                signed_date TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ E-signature documents table created');

        // Network MAC addresses table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS network_mac_addresses (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                mac_address VARCHAR(17) UNIQUE NOT NULL,
                device_name VARCHAR(255),
                device_type VARCHAR(100),
                user_name VARCHAR(255),
                description TEXT,
                is_allowed BOOLEAN DEFAULT true,
                blocked_reason VARCHAR(500),
                blocked_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Network MAC addresses table created');

        // Hardware inventory table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS hardware_inventory (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                device_type VARCHAR(100),
                device_name VARCHAR(255),
                user_name VARCHAR(255),
                make VARCHAR(100),
                model VARCHAR(100),
                cpu VARCHAR(255),
                ram VARCHAR(50),
                purchase_date DATE,
                value_usd DECIMAL(10, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Hardware inventory table created');

        // Settings table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS settings (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                api_provider VARCHAR(50),
                api_key_encrypted VARCHAR(500),
                api_secret_encrypted VARCHAR(500),
                api_url VARCHAR(500),
                is_active BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Settings table created');

        // Activity logs table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS activity_logs (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE SET NULL,
                action VARCHAR(100),
                resource_type VARCHAR(50),
                resource_id VARCHAR(255),
                details TEXT,
                ip_address VARCHAR(45),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Activity logs table created');

        // Create indexes for better performance
        console.log('🔄 Creating indexes...');
        
        await newPool.query('CREATE INDEX idx_projects_assigned_to ON projects(assigned_to);');
        await newPool.query('CREATE INDEX idx_tasks_project_id ON tasks(project_id);');
        await newPool.query('CREATE INDEX idx_call_history_created ON call_history(created_at);');
        await newPool.query('CREATE INDEX idx_network_mac_is_allowed ON network_mac_addresses(is_allowed);');
        await newPool.query('CREATE INDEX idx_settings_user_id ON settings(user_id);');
        await newPool.query('CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);');
        
        console.log('✅ Indexes created');

        console.log('\n✅ Database initialization complete!');
        await newPool.end();

    } catch (error) {
        if (error.message.includes('already exists')) {
            console.log('⚠️  Database already exists');
        } else {
            console.error('❌ Error initializing database:', error);
        }
    }
};

initDb().then(() => {
    console.log('Database setup finished');
    process.exit(0);
}).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});








