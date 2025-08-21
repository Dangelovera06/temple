import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication disabled for local development
export const base44 = createClient({
  appId: "68a78dd70c7582e3757c7762", 
  requiresAuth: false // Disable authentication for local development
});
