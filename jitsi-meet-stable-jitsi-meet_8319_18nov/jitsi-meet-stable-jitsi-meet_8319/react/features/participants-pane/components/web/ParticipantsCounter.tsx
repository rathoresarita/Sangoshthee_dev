import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { IReduxState } from '../../../app/types';
import {
    
    isLocalParticipantModerator,
    
} from '../../../base/participants/functions';


import { getParticipantCount } from '../../../base/participants/functions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';

const useStyles = makeStyles()(theme => {
    return {
        badge: {
            backgroundColor: theme.palette.ui03,
            borderRadius: '100%',
            height: '16px',
            minWidth: '16px',
            color: theme.palette.text01,
            ...withPixelLineHeight(theme.typography.labelBold),
            pointerEvents: 'none',
            position: 'absolute',
            right: '-4px',
            top: '-3px',
            textAlign: 'center',
            paddingTop: '2px'
        }
    };
});

const ParticipantsCounter = () => {
    const { classes } = useStyles();
         const participantsCount = useSelector(getParticipantCount);
//     const isModerator = isLocalParticipantModerator(state);
//     // const isLocal=isParticipantNotModerator(state)
//  const webinarEnabled = state['features/base/conference'].webinarEnabled;
//     //   /

    // //const visible= !webinarEnabled?<span className = { classes.badge }>{participantsCount}</span>:isModerator;
    // const isModerator = useSelector(isLocalParticipantModerator); // Get the isModerator value from Redux state
    // const webinarEnabled = useSelector((state: IReduxState)=> state['features/base/conference'].webinarEnabled); // Get the webinarEnabled value from Redux state

    // // If webinar is enabled and the user is not a moderator, don't show the counter
    // if (webinarEnabled==false && isModerator==false) {
    //     return null;
    // }

    return <span className = { classes.badge }>{participantsCount}</span>
};

export default ParticipantsCounter;
