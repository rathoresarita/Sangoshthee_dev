import { PARTICIPANTS_PANE_CLOSE } from './actionTypes';

import { ENABLE_WEBINAR } from './actionTypes';

/**
 * Action to close the participants pane.
 *
 * @returns {Object}
 */
export const close = () => {
    return {
        type: PARTICIPANTS_PANE_CLOSE
    };
};

//action to enable webinar
export const enableWebinar = () => ({
    type: ENABLE_WEBINAR
    
  });