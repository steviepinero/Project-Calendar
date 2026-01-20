/**
 * Express Server Setup
 * Main server file for MSP Project Calendar
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

const pool = require('./db/connection');
const ProjectRepository = require('./db/repositories/projectRepository');

const app = express();

// ===== MIDDLEWARE =====

// Security
app.use(helmet());

// Logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));

// Serve static files (frontend)
app.use(express.static('.'));

// ===== ROUTES =====

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// ===== PROJECT ROUTES =====

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await ProjectRepository.getAll(req.query);
        res.json({
            success: true,
            data: projects,
            count: projects.length
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get project by ID
app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await ProjectRepository.getById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get projects with team members
app.get('/api/projects-with-team', async (req, res) => {
    try {
        const projects = await ProjectRepository.getWithTeamMembers();
        res.json({ success: true, data: projects });
    } catch (error) {
        console.error('Error fetching projects with team:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create project
app.post('/api/projects', async (req, res) => {
    try {
        const project = await ProjectRepository.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update project
app.put('/api/projects/:id', async (req, res) => {
    try {
        const project = await ProjectRepository.update(req.params.id, req.body);
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const result = await ProjectRepository.delete(req.params.id);
        if (!result) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get projects by date range
app.get('/api/projects/range', async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        if (!start_date || !end_date) {
            return res.status(400).json({ 
                success: false, 
                error: 'start_date and end_date are required' 
            });
        }
        const projects = await ProjectRepository.getByDateRange(start_date, end_date);
        res.json({ success: true, data: projects });
    } catch (error) {
        console.error('Error fetching projects by date range:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== TEAM MEMBERS ROUTES =====

// Get all team members
app.get('/api/team-members', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM team_members WHERE is_active = true;');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create team member
app.post('/api/team-members', async (req, res) => {
    try {
        const { name, email, role, color_gradient, max_daily_hours } = req.body;
        const result = await pool.query(
            `INSERT INTO team_members (name, email, role, color_gradient, max_daily_hours) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
            [name, email, role, color_gradient, max_daily_hours || 8]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating team member:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== CALL HISTORY ROUTES =====

// Get call history
app.get('/api/calls', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM call_history ORDER BY created_at DESC LIMIT 100;'
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching call history:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Log a call
app.post('/api/calls', async (req, res) => {
    try {
        const { from_number, to_number, call_type, duration_seconds, status } = req.body;
        const result = await pool.query(
            `INSERT INTO call_history (from_number, to_number, call_type, duration_seconds, status) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
            [from_number, to_number, call_type, duration_seconds, status]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error logging call:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== ERROR HANDLING =====

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        success: false, 
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
    });
});

// ===== START SERVER =====

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`
╔════════════════════════════════════════════╗
║  MSP Project Calendar Server               ║
║  Started on http://${HOST}:${PORT}        ║
║  Environment: ${process.env.NODE_ENV || 'development'}          ║
╚════════════════════════════════════════════╝
    `);
});

module.exports = app;

