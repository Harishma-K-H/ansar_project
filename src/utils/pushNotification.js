import BASE_URL from "./baseUrl";

async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const applicationServerKey = urlBase64ToUint8Array("BGcKAcE2dzWRzVCOcZ5fRoL8hvUf6eB16nJoelPenqDYNyX2hLkWFh4QrRwK3GdT3nsS_dhhQEHv7bFh9ISCKKU");
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
    });

    // Send subscription to the server without CSRF token
    const response = await fetch(`${BASE_URL}/api/save-subscription/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
    });

    if (!response.ok) {
        throw new Error('Failed to save subscription');
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

export default subscribeToPush;
