export const attachScript = () => {
    const script = document.createElement('script');
    const meta = document.createElement('meta');
    meta.name = 'google-signin-client_id';
    meta.content =
        '376823120997-75p0s093aksc8qg3tvj28im2eq2dpnf5.apps.googleusercontent.com';
    script.src = 'https://apis.google.com/js/platform.js';

    document.head.appendChild(meta);
    document.head.appendChild(script);
};
