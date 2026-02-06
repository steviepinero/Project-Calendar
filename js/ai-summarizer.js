// AI Summarization Module using OpenAI API

/**
 * Summarizes text using OpenAI's GPT model
 * @param {string} text - The text to summarize
 * @returns {Promise<string>} - The summarized text
 */
async function summarizeText(text) {
    // Check if text is empty or too short
    if (!text || text.trim().length < 10) {
        throw new Error('Text is too short to summarize. Please provide at least 10 characters.');
    }

    // Get API key from config
    const apiKey = window.CONFIG?.OPENAI_API_KEY;
    if (!apiKey) {
        // Fallback to localStorage if config not loaded
        const storedKey = localStorage.getItem('openaiApiKey');
        if (!storedKey) {
            throw new Error('OpenAI API key not found. Please configure it in Settings.');
        }
        return summarizeWithKey(text, storedKey);
    }

    return summarizeWithKey(text, apiKey);
}

/**
 * Internal function to call OpenAI API with provided key
 * @param {string} text - The text to summarize
 * @param {string} apiKey - The OpenAI API key
 * @returns {Promise<string>} - The summarized text
 */
async function summarizeWithKey(text, apiKey) {
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that summarizes project notes and task descriptions concisely. Keep summaries brief (2-3 sentences) and focus on key action items, issues, and progress.'
                    },
                    {
                        role: 'user',
                        content: `Please summarize the following project notes:\n\n${text}`
                    }
                ],
                temperature: 0.5,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenAI API key in Settings.');
            } else if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please try again in a moment.');
            } else if (response.status === 500) {
                throw new Error('OpenAI service error. Please try again later.');
            } else {
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }
        }

        const data = await response.json();
        
        if (!data.choices || data.choices.length === 0) {
            throw new Error('No summary generated. Please try again.');
        }

        return data.choices[0].message.content.trim();
        
    } catch (error) {
        // Handle network errors
        if (error.message.includes('fetch')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
    }
}

/**
 * Summarizes the notes from the edit modal
 * Updates the description field with the summary
 */
async function summarizeNotesFromModal() {
    const notesField = document.getElementById('editNotes');
    const descriptionField = document.getElementById('editDescription');
    const summarizeBtn = document.getElementById('summarizeNotesBtn');
    
    if (!notesField || !descriptionField) {
        console.error('Required fields not found');
        return;
    }

    const notes = notesField.value;
    
    if (!notes || notes.trim().length < 10) {
        alert('⚠️ Please enter at least 10 characters in the Notes field to generate a summary.');
        return;
    }

    // Update button state
    const originalBtnText = summarizeBtn.innerHTML;
    summarizeBtn.disabled = true;
    summarizeBtn.innerHTML = '⏳ Summarizing...';
    summarizeBtn.style.opacity = '0.6';
    summarizeBtn.style.cursor = 'not-allowed';

    try {
        // Call OpenAI API to summarize
        const summary = await summarizeText(notes);
        
        // Update description field with summary
        descriptionField.value = summary;
        
        // Show success feedback
        summarizeBtn.innerHTML = '✓ Done!';
        summarizeBtn.style.backgroundColor = '#27ae60';
        
        // Visual feedback
        descriptionField.style.transition = 'background-color 0.3s ease';
        descriptionField.style.backgroundColor = '#e8f5e9';
        setTimeout(() => {
            descriptionField.style.backgroundColor = '';
        }, 1000);
        
        // Reset button after 2 seconds
        setTimeout(() => {
            summarizeBtn.innerHTML = originalBtnText;
            summarizeBtn.disabled = false;
            summarizeBtn.style.opacity = '1';
            summarizeBtn.style.cursor = 'pointer';
            summarizeBtn.style.backgroundColor = '';
        }, 2000);
        
    } catch (error) {
        console.error('Summarization error:', error);
        
        // Show error to user
        alert(`❌ Summarization Failed\n\n${error.message}\n\n` +
              `Tips:\n` +
              `• Make sure your API key is valid\n` +
              `• Check your internet connection\n` +
              `• Verify you have OpenAI API credits\n` +
              `• Configure API key in Settings if not set`);
        
        // Reset button
        summarizeBtn.innerHTML = originalBtnText;
        summarizeBtn.disabled = false;
        summarizeBtn.style.opacity = '1';
        summarizeBtn.style.cursor = 'pointer';
    }
}

// Export functions for use in other modules
if (typeof window !== 'undefined') {
    window.AISummarizer = {
        summarizeText,
        summarizeNotesFromModal
    };
}


