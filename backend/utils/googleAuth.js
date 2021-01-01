const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(process.env.CLIENT_ID);
module.exports = verifyToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (payload) {
        const aud = payload['aud'];
        if (aud === process.env.CLIENT_ID) {
            const userId = payload['sub'];
            const isEmailVerified = payload['email_verified'];
            const name = payload['name'];
            const picture = payload['picture'];
            const email = payload['email'];
            return {
                userId,
                isEmailVerified,
                name,
                picture,
                email,
            };
        } else {
            throw new Error('Not authenticated');
        }
    }
};
