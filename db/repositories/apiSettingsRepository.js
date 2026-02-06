/**
 * API Settings Repository
 * Handles CRUD operations for API keys and settings
 */

const pool = require('../connection');

class ApiSettingsRepository {
    /**
     * Get all API settings
     */
    static async getAll() {
        const query = `
            SELECT id, setting_key, setting_value, description, is_encrypted, 
                   created_at, updated_at
            FROM api_settings
            ORDER BY setting_key ASC;
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    /**
     * Get a specific setting by key
     */
    static async getByKey(key) {
        const query = `
            SELECT id, setting_key, setting_value, description, is_encrypted, 
                   created_at, updated_at
            FROM api_settings
            WHERE setting_key = $1;
        `;
        const result = await pool.query(query, [key]);
        return result.rows[0] || null;
    }

    /**
     * Get multiple settings by keys
     */
    static async getByKeys(keys) {
        const query = `
            SELECT id, setting_key, setting_value, description, is_encrypted, 
                   created_at, updated_at
            FROM api_settings
            WHERE setting_key = ANY($1);
        `;
        const result = await pool.query(query, [keys]);
        return result.rows;
    }

    /**
     * Create or update a setting
     */
    static async upsert(key, value, description = null) {
        const query = `
            INSERT INTO api_settings (setting_key, setting_value, description)
            VALUES ($1, $2, $3)
            ON CONFLICT (setting_key) 
            DO UPDATE SET 
                setting_value = $2,
                description = COALESCE($3, api_settings.description),
                updated_at = CURRENT_TIMESTAMP
            RETURNING *;
        `;
        const result = await pool.query(query, [key, value, description]);
        return result.rows[0];
    }

    /**
     * Update a setting value
     */
    static async update(key, value) {
        const query = `
            UPDATE api_settings
            SET setting_value = $2, updated_at = CURRENT_TIMESTAMP
            WHERE setting_key = $1
            RETURNING *;
        `;
        const result = await pool.query(query, [key, value]);
        return result.rows[0] || null;
    }

    /**
     * Delete a setting
     */
    static async delete(key) {
        const query = `
            DELETE FROM api_settings
            WHERE setting_key = $1
            RETURNING *;
        `;
        const result = await pool.query(query, [key]);
        return result.rows[0] || null;
    }

    /**
     * Bulk update multiple settings
     */
    static async bulkUpdate(settings) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            
            const results = [];
            for (const [key, value] of Object.entries(settings)) {
                const query = `
                    INSERT INTO api_settings (setting_key, setting_value)
                    VALUES ($1, $2)
                    ON CONFLICT (setting_key) 
                    DO UPDATE SET 
                        setting_value = $2,
                        updated_at = CURRENT_TIMESTAMP
                    RETURNING *;
                `;
                const result = await client.query(query, [key, value]);
                results.push(result.rows[0]);
            }
            
            await client.query('COMMIT');
            return results;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Get settings as key-value object (for easy frontend consumption)
     */
    static async getAllAsObject() {
        const settings = await this.getAll();
        const obj = {};
        settings.forEach(setting => {
            obj[setting.setting_key] = setting.setting_value;
        });
        return obj;
    }

    /**
     * Mask sensitive values for display
     */
    static maskValue(value, showChars = 8) {
        if (!value || value.length <= showChars) {
            return value;
        }
        return value.substring(0, showChars) + '*'.repeat(value.length - showChars);
    }

    /**
     * Get all settings with masked values
     */
    static async getAllMasked() {
        const settings = await this.getAll();
        return settings.map(setting => ({
            ...setting,
            setting_value: this.maskValue(setting.setting_value)
        }));
    }
}

module.exports = ApiSettingsRepository;



