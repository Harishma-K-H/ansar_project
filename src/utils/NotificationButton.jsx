import React from 'react';
import subscribeToPush from './pushNotification';

function NotificationButton()
{
    const handleSubscribe = async () =>
    {
        try
        {
            // Request permission to show notifications
            const permission = await Notification.requestPermission();
            if (permission === 'granted')
            {
                await subscribeToPush();
                alert('You are subscribed to notifications!');
            } else
            {
                alert('You need to grant permission to receive notifications.');
            }
        } catch (error)
        {
            console.error('Failed to subscribe to push notifications:', error);
            alert('Failed to subscribe. Please try again.');
        }
    };

    return (
        <button className='btn btn-outline-primary' onClick={handleSubscribe}>
            Subscribe to Notifications
        </button>
    );
}

export default NotificationButton;
