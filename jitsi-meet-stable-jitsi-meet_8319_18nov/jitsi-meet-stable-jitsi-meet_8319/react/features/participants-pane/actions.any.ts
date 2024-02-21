import {
    PARTICIPANTS_PANE_CLOSE,
    PARTICIPANTS_PANE_OPEN,
    ENABLE_WEBINAR,
    DISABLE_WEBINAR,
    ENABLE_NOTIFICATIONS

} from './actionTypes';

/**
 * Action to close theenableNotifications() participants pane.
 *
 * @returns {Object}
 */
export const close = () => {
    return {
        type: PARTICIPANTS_PANE_CLOSE
    };
};

/**
 * Action to open the participants pane.
 *
 * @returns {Object}
 */
export const open = () => {
    return {
        type: PARTICIPANTS_PANE_OPEN
    };
};

//action to enable webinar
export const enableWebinar = () => ({
    type: ENABLE_WEBINAR
    
  });
  //action to enable webinar
export const disableWebinar = () => ({
    type: DISABLE_WEBINAR
    
  });
  
  export const enableNotifications = () => ({
    type: ENABLE_NOTIFICATIONS
    
  })