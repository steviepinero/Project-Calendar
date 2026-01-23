/**
 * Syncfusion License Key Configuration (EXAMPLE)
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to 'syncfusion-license.js'
 * 2. Replace 'YOUR-LICENSE-KEY-HERE' with your actual Syncfusion license key
 * 3. The actual license file is gitignored and won't be committed
 * 
 * For deployment:
 * - Manually add syncfusion-license.js to your deployment (GitHub Pages, etc.)
 * - Or use GitHub Secrets in a build process
 */

// Register Syncfusion license
if (typeof ej !== 'undefined' && ej.base) {
    ej.base.registerLicense('YOUR-LICENSE-KEY-HERE');
    console.log('✅ Syncfusion license registered');
} else {
    console.warn('⚠️ Syncfusion not loaded yet, license will be registered when available');
}

