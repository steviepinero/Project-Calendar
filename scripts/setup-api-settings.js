/**
 * Setup Script for API Settings Table
 * Runs the SQL script to create the api_settings table
 */

const fs = require('fs');
const path = require('path');
const pool = require('../db/connection');

async function setupApiSettings() {
    console.log('📦 Setting up API settings table...\n');
    
    try {
        // Read the SQL file
        const sqlPath = path.join(__dirname, 'create-api-settings-table.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        console.log('📄 Executing SQL script...');
        
        // Execute the SQL
        await pool.query(sql);
        
        console.log('✅ API settings table created successfully!');
        console.log('\n📊 Verifying table...');
        
        // Verify the table was created
        const result = await pool.query(`
            SELECT setting_key, description 
            FROM api_settings 
            ORDER BY setting_key;
        `);
        
        console.log(`✅ Found ${result.rows.length} default API key entries:\n`);
        result.rows.forEach(row => {
            console.log(`   - ${row.setting_key}: ${row.description}`);
        });
        
        console.log('\n🎉 Setup complete! You can now use the API settings database.');
        console.log('\nNext steps:');
        console.log('1. Start the server: npm start');
        console.log('2. Open the app and go to Settings');
        console.log('3. Enter your API keys and save');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up API settings table:', error);
        console.error('\nTroubleshooting:');
        console.error('1. Make sure PostgreSQL is running');
        console.error('2. Check your .env file for correct database credentials');
        console.error('3. Ensure the database exists: psql -U postgres -l');
        console.error('4. Try connecting manually: psql -U postgres -d msp_calendar_dev');
        process.exit(1);
    }
}

// Run the setup
setupApiSettings();



