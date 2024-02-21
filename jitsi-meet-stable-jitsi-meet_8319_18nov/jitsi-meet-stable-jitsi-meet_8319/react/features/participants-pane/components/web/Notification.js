// Notification.js (example)
import React from 'react';

const Notification = ({ titleKey, closeButton, msgString }) => {
    return (
        <div>
            <div>{titleKey}</div>
            <div>{msgString}</div>
            {closeButton && <button onClick={ onclose}>Close</button>}
        </div>
    );
};

export default Notification;
