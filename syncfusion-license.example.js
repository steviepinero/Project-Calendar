/**
 * Syncfusion License Key Configuration (EXAMPLE)
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to 'syncfusion-license.js'
 * 2. Replace 'YOUR-LICENSE-KEY-HERE' with your actual Syncfusion license key
 * 3. Make sure the license key matches your Syncfusion version (24.x, 32.x, etc.)
 * 4. The actual license file is gitignored and won't be committed
 * 
 * For deployment:
 * - Manually add syncfusion-license.js to your deployment (GitHub Pages, etc.)
 * - Or use GitHub Secrets in a build process
 * 
 * Version-specific keys:
 * - v24.x: One license key format
 * - v32.x: Different license key format
 * Check your Syncfusion account for the correct key for your version
 */

// Register Syncfusion license
if (typeof ej !== 'undefined' && ej.base) {
    ej.base.registerLicense('YOUR-LICENSE-KEY-HERE');
    console.log('✅ Syncfusion license registered');
} else {
    console.warn('⚠️ Syncfusion not loaded yet, license will be registered when available');
}

