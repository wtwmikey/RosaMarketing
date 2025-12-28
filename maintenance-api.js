/**
 * Maintenance Mode Remote Storage
 * 
 * SIMPLE SETUP (Recommended - No API keys needed):
 * 1. Create a GitHub Gist at https://gist.github.com/
 * 2. Create a file named "maintenance-status.json" with this content:
 *    {"maintenanceMode": "false"}
 * 3. Click "Create public gist"
 * 4. Copy the Gist ID from the URL (the long hash after /gist/)
 * 5. Update GIST_ID below with your Gist ID
 * 
 * The Gist URL will be: https://gist.githubusercontent.com/YOUR_USERNAME/GIST_ID/raw/maintenance-status.json
 * But we'll use the direct raw URL format below
 */

const MAINTENANCE_CONFIG = {
    // GitHub Gist ID (e.g., "abc123def456..." from your Gist URL)
    gistId: 'YOUR_GIST_ID_HERE',
    
    // Alternative: Direct URL to your JSON file
    // You can host a JSON file anywhere (GitHub, your server, etc.)
    directUrl: null, // e.g., 'https://yourdomain.com/maintenance-status.json'
    
    // Fallback to localStorage if remote fetch fails
    fallbackToLocalStorage: true,
    
    // Cache duration in milliseconds (5 minutes)
    cacheDuration: 5 * 60 * 1000
};

// Cache for maintenance status
let maintenanceCache = {
    status: null,
    timestamp: null
};

/**
 * Get maintenance mode status from remote storage
 */
async function getMaintenanceStatus() {
    // Check cache first
    if (maintenanceCache.status !== null && maintenanceCache.timestamp) {
        const now = Date.now();
        if (now - maintenanceCache.timestamp < MAINTENANCE_CONFIG.cacheDuration) {
            return maintenanceCache.status === 'true' || maintenanceCache.status === true;
        }
    }
    
    try {
        let url = null;
        
        // Use direct URL if provided
        if (MAINTENANCE_CONFIG.directUrl) {
            url = MAINTENANCE_CONFIG.directUrl;
        }
        // Use GitHub Gist if Gist ID is provided
        else if (MAINTENANCE_CONFIG.gistId && MAINTENANCE_CONFIG.gistId !== 'YOUR_GIST_ID_HERE') {
            // Get Gist ID and construct raw URL
            // Format: https://gist.githubusercontent.com/USERNAME/GIST_ID/raw/FILENAME
            // We'll use a simpler approach with just the Gist ID
            url = `https://gist.githubusercontent.com/${MAINTENANCE_CONFIG.gistId}/raw/maintenance-status.json`;
        }
        
        if (url) {
            // Add cache busting to ensure fresh data
            const response = await fetch(`${url}?t=${Date.now()}`, {
                method: 'GET',
                cache: 'no-cache'
            });
            
            if (response.ok) {
                const data = await response.json();
                const status = data.maintenanceMode === true || data.maintenanceMode === 'true';
                
                // Update cache
                maintenanceCache.status = data.maintenanceMode;
                maintenanceCache.timestamp = Date.now();
                
                // Also sync to localStorage
                localStorage.setItem('maintenanceMode', status ? 'true' : 'false');
                
                return status;
            }
        }
    } catch (error) {
        console.warn('Failed to fetch maintenance status from remote:', error);
    }
    
    // Fallback to localStorage
    if (MAINTENANCE_CONFIG.fallbackToLocalStorage) {
        const localStatus = localStorage.getItem('maintenanceMode');
        return localStatus === 'true';
    }
    
    return false;
}

/**
 * Set maintenance mode status in remote storage
 * Note: This requires a backend API or manual Gist update
 * For now, we'll update localStorage and provide instructions
 */
async function setMaintenanceStatus(enabled) {
    // Always update localStorage immediately
    localStorage.setItem('maintenanceMode', enabled ? 'true' : 'false');
    
    // Update cache
    maintenanceCache.status = enabled ? 'true' : 'false';
    maintenanceCache.timestamp = Date.now();
    
    // For GitHub Gist, you'll need to manually update or use GitHub API
    // For production, set up a simple backend endpoint
    console.log('Maintenance mode updated locally. For cross-device sync, update your remote storage.');
    
    return true;
}

// Export functions
if (typeof window !== 'undefined') {
    window.getMaintenanceStatus = getMaintenanceStatus;
    window.setMaintenanceStatus = setMaintenanceStatus;
}

