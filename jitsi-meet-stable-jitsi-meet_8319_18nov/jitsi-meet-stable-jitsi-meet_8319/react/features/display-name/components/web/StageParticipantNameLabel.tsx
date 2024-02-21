import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { isDisplayNameVisible } from '../../../base/config/functions.any';
import { isLocalParticipantModerator } from '../../../base/participants/functions';
import {
    getLocalParticipant,
    getParticipantDisplayName,
    isWhiteboardParticipant,getModerator,
    getOneModerator
} from '../../../base/participants/functions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import { getLargeVideoParticipant ,getLargeModeratorVideo} from '../../../large-video/functions';
import { isToolboxVisible } from '../../../toolbox/functions.web';
import { isLayoutTileView } from '../../../video-layout/functions.web';

import DisplayNameBadge from './DisplayNameBadge';
import { State } from 'react-native-gesture-handler';

const useStyles = makeStyles()(theme => {
    return {
        badgeContainer: {
            ...withPixelLineHeight(theme.typography.bodyShortRegularLarge),
            alignItems: 'center',
            display: 'inline-flex',
            justifyContent: 'center',
            marginBottom: theme.spacing(7),
            transition: 'margin-bottom 0.3s',
            pointerEvents: 'none',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 1
        },
        containerElevated: {
            marginBottom: theme.spacing(12)
        }
    };
});

/**
 * Component that renders the dominant speaker's name as a badge above the toolbar in stage view.
 *
 * @returns {ReactElement|null}
 */
const StageParticipantNameLabel = () => {
    const { classes, cx } = useStyles();
    const largeVideoParticipant = useSelector(getLargeVideoParticipant);
    const largeVideoModerator = useSelector(getLargeModeratorVideo);
    
    const selectedId = largeVideoParticipant?.id;
    
    const nameToDisplay = useSelector((state: IReduxState) => getParticipantDisplayName(state, selectedId ?? ''));
    const isModerator=useSelector((state:IReduxState)=>isLocalParticipantModerator(state))


    
       const moderatorId=useSelector((state:IReduxState)=>getOneModerator(state)?.id);
       const selectedModeratorId=largeVideoModerator?.id  
       const nameToDisplayModerator = useSelector((state: IReduxState) => getParticipantDisplayName(state, selectedModeratorId?? ''));
    
   
       // moderatorId=getModerator(state)?.id
       
      // console.log('MMMMMMMMMMMMMMMMMMM',moderatorIds)
       const webinarEnabled = useSelector((state:IReduxState)=>state['features/base/conference'].webinarEnabled);
   //console.log('webbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbin',webinarEnabled)
   
    const localParticipant = useSelector(getLocalParticipant);
    const localId = localParticipant?.id;

    const isTileView = useSelector(isLayoutTileView);
    const toolboxVisible: boolean = useSelector(isToolboxVisible);
    const showDisplayName = useSelector(isDisplayNameVisible);

    if (showDisplayName && !webinarEnabled
        && nameToDisplay
        && selectedId !== localId
        && !isTileView
        && !isWhiteboardParticipant(largeVideoParticipant)
    ) {
        return (
            <div
                className = { cx(
                    'stage-participant-label',
                    classes.badgeContainer,
                    toolboxVisible && classes.containerElevated
                ) }>
                <DisplayNameBadge name = { nameToDisplay } />
            </div>
        );
    }
    if (
        webinarEnabled&&
        !isModerator&&
        !isTileView &&
        
        showDisplayName
        
        
    ) {
        return (
            <div>
                        </div>
        );
    }

    return null;
};

export default StageParticipantNameLabel;
