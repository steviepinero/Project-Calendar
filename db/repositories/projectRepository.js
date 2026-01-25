/**
 * Project Model / Repository
 * Handles all project database operations
 */

const pool = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

class ProjectRepository {
    // Create a new project
    static async create(projectData) {
        const {
            name,
            description,
            type,
            status,
            assigned_to,
            duration_hours,
            daily_limit,
            start_date,
            end_date
        } = projectData;

        const query = `
            INSERT INTO projects 
            (id, name, description, type, status, assigned_to, duration_hours, daily_limit, start_date, end_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `;

        const result = await pool.query(query, [
            uuidv4(),
            name,
            description,
            type,
            status || 'On Track',
            assigned_to,
            duration_hours,
            daily_limit,
            start_date,
            end_date
        ]);

        return result.rows[0];
    }

    // Get all projects
    static async getAll(filters = {}) {
        let query = `SELECT * FROM projects WHERE 1=1`;
        const params = [];

        if (filters.assigned_to) {
            params.push(filters.assigned_to);
            query += ` AND assigned_to = $${params.length}`;
        }

        if (filters.status) {
            params.push(filters.status);
            query += ` AND status = $${params.length}`;
        }

        query += ` ORDER BY start_date DESC;`;

        const result = await pool.query(query, params);
        return result.rows;
    }

    // Get project by ID
    static async getById(projectId) {
        const query = `
            SELECT p.*, 
                   tm.name as assigned_to_name,
                   COALESCE(json_agg(json_build_object('id', t.id, 'title', t.title, 'status', t.status)) FILTER (WHERE t.id IS NOT NULL), '[]'::json) as tasks
            FROM projects p
            LEFT JOIN team_members tm ON p.assigned_to = tm.id
            LEFT JOIN tasks t ON p.id = t.project_id
            WHERE p.id = $1
            GROUP BY p.id, tm.id;
        `;

        const result = await pool.query(query, [projectId]);
        return result.rows[0];
    }

    // Update project
    static async update(projectId, updates) {
        const validFields = ['name', 'description', 'type', 'status', 'assigned_to', 'duration_hours', 'daily_limit', 'start_date', 'end_date'];
        const setClause = [];
        const params = [];
        let paramIndex = 1;

        for (const [key, value] of Object.entries(updates)) {
            if (validFields.includes(key)) {
                setClause.push(`${key} = $${paramIndex}`);
                params.push(value);
                paramIndex++;
            }
        }

        if (setClause.length === 0) return null;

        params.push(projectId);
        const query = `
            UPDATE projects 
            SET ${setClause.join(', ')}, updated_at = CURRENT_TIMESTAMP
            WHERE id = $${paramIndex}
            RETURNING *;
        `;

        const result = await pool.query(query, params);
        return result.rows[0];
    }

    // Delete project
    static async delete(projectId) {
        const query = 'DELETE FROM projects WHERE id = $1 RETURNING id;';
        const result = await pool.query(query, [projectId]);
        return result.rows[0];
    }

    // Get projects with team member info
    static async getWithTeamMembers() {
        const query = `
            SELECT 
                p.id,
                p.name,
                p.description,
                p.type,
                p.status,
                p.duration_hours,
                p.daily_limit,
                p.start_date,
                p.end_date,
                tm.id as team_member_id,
                tm.name as team_member_name,
                tm.color_gradient,
                tm.email
            FROM projects p
            LEFT JOIN team_members tm ON p.assigned_to = tm.id
            ORDER BY p.start_date DESC;
        `;

        const result = await pool.query(query);
        return result.rows;
    }

    // Get projects by date range
    static async getByDateRange(startDate, endDate) {
        const query = `
            SELECT * FROM projects 
            WHERE start_date <= $2 AND end_date >= $1
            ORDER BY start_date ASC;
        `;

        const result = await pool.query(query, [startDate, endDate]);
        return result.rows;
    }
}

module.exports = ProjectRepository;


