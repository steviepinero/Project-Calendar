/**
 * API Service Layer
 * Handles all communication with the Node.js/PostgreSQL backend
 * Replace localStorage calls with API calls
 */

const API_BASE_URL = 'http://localhost:8000/api';

class APIService {
    /**
     * Helper method for all API calls
     */
    static async request(endpoint, options = {}) {
        try {
            const url = `${API_BASE_URL}${endpoint}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `API Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    /**
     * PROJECT ENDPOINTS
     */

    // Get all projects
    static async getProjects(filters = {}) {
        const query = new URLSearchParams(filters).toString();
        return this.request(`/projects${query ? '?' + query : ''}`);
    }

    // Get project by ID
    static async getProject(projectId) {
        return this.request(`/projects/${projectId}`);
    }

    // Get projects with team member info
    static async getProjectsWithTeam() {
        return this.request('/projects-with-team');
    }

    // Create project
    static async createProject(projectData) {
        return this.request('/projects', {
            method: 'POST',
            body: JSON.stringify(projectData)
        });
    }

    // Update project
    static async updateProject(projectId, updates) {
        return this.request(`/projects/${projectId}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }

    // Delete project
    static async deleteProject(projectId) {
        return this.request(`/projects/${projectId}`, {
            method: 'DELETE'
        });
    }

    // Get projects by date range
    static async getProjectsByDateRange(startDate, endDate) {
        return this.request(`/projects/range?start_date=${startDate}&end_date=${endDate}`);
    }

    /**
     * TEAM MEMBERS ENDPOINTS
     */

    // Get all team members
    static async getTeamMembers() {
        return this.request('/team-members');
    }

    // Create team member
    static async createTeamMember(memberData) {
        return this.request('/team-members', {
            method: 'POST',
            body: JSON.stringify(memberData)
        });
    }

    /**
     * CALL HISTORY ENDPOINTS
     */

    // Get call history
    static async getCallHistory() {
        return this.request('/calls');
    }

    // Log a call
    static async logCall(callData) {
        return this.request('/calls', {
            method: 'POST',
            body: JSON.stringify(callData)
        });
    }

    /**
     * HEALTH CHECK
     */

    static async healthCheck() {
        return this.request('/health');
    }
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIService;
}








