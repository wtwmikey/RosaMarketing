# Maintenance Mode Cross-Device Setup

## Problem
By default, maintenance mode uses `localStorage`, which is device/browser-specific. This means maintenance mode enabled on one device won't appear on another device.

## Solution
Use remote storage to sync maintenance mode across all devices. Follow these simple setup instructions:

## Quick Setup (GitHub Gist - Recommended)

### Step 1: Create a GitHub Gist
1. Go to https://gist.github.com/
2. Create a new file named `maintenance-status.json`
3. Add this content:
   ```json
   {"maintenanceMode": "false"}
   ```
4. Click "Create public gist"
5. Copy the Gist ID from the URL (the long hash, e.g., `abc123def456...`)

### Step 2: Update Configuration
1. Open `maintenance-api.js`
2. Find this line:
   ```javascript
   gistId: 'YOUR_GIST_ID_HERE',
   ```
3. Replace `YOUR_GIST_ID_HERE` with your actual Gist ID

### Step 3: Get Your Gist Raw URL
1. In your Gist, click on `maintenance-status.json`
2. Click the "Raw" button
3. Copy the full URL (it will look like: `https://gist.githubusercontent.com/USERNAME/GIST_ID/raw/maintenance-status.json`)
4. In `maintenance-api.js`, you can also use the `directUrl` option:
   ```javascript
   directUrl: 'https://gist.githubusercontent.com/YOUR_USERNAME/YOUR_GIST_ID/raw/maintenance-status.json',
   ```

## Alternative: Use Your Own Server

If you have a backend server, you can host a simple JSON file:

1. Create a file `maintenance-status.json` on your server:
   ```json
   {"maintenanceMode": "false"}
   ```
2. Update `maintenance-api.js`:
   ```javascript
   directUrl: 'https://yourdomain.com/maintenance-status.json',
   ```

## How It Works

- When you enable/disable maintenance mode in the admin panel, it updates both localStorage (for immediate effect) and attempts to update remote storage
- All devices check the remote storage first, then fall back to localStorage if the remote check fails
- This ensures maintenance mode works across all devices and browsers

## Manual Update (If Needed)

If you need to manually update maintenance mode:

1. **GitHub Gist**: Edit your Gist file and change `"maintenanceMode": "false"` to `"maintenanceMode": "true"` (or vice versa)
2. **Server File**: Edit your `maintenance-status.json` file on your server

## Notes

- The system caches the status for 5 minutes to reduce API calls
- If remote storage fails, it falls back to localStorage (device-specific)
- For production use, consider setting up a simple backend API for more control

