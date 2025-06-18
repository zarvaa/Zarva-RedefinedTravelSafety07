import { Client, Account, Databases, Models, OAuthProvider } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('683e9e370033402c8ab8');

const account = new Account(client);
const databases = new Databases(client);

// Database and collection constants
const DATABASE_ID: string = '683e9e67003a4dd76d38';
const COLLECTION_ID: string = '683e9e74001bfa8b642c';

// Authentication helper functions
const createSession = async (email: string, password: string): Promise<Models.Session> => {
    try {
        return await account.createSession(email, password);
    } catch (error) {
        console.error('Session creation failed:', error);
        throw error;
    }
};

// OAuth authentication helper
const createOAuthSession = async (provider: OAuthProvider): Promise<void> => {
    try {
        // The URL to redirect to after successful authentication
        const redirectUrl = `${window.location.origin}/auth-callback`;
        
        // For Appwrite OAuth with Vercel, we need to use the correct configuration
        await account.createOAuth2Session(
            provider, 
            redirectUrl,
            `${window.location.origin}/` // Redirect to home page on failure
        );
    } catch (error) {
        console.error('OAuth session creation failed:', error);
        throw error;
    }
};

export {
    client,
    account,
    databases,
    DATABASE_ID,
    COLLECTION_ID,
    createSession,
    createOAuthSession
};