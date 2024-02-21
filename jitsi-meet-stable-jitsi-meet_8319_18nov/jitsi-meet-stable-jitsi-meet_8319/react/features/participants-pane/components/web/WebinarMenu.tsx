import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import {
    requestDisableAudioModeration,
    requestDisableVideoModeration,
    requestEnableAudioModeration,
    requestEnableVideoModeration,
    requestDisableAudioandVideoModerationforWebinar,

    requestEnableAudioandVideoModerationforWebinar
} from '../../../av-moderation/actions';
import {
    isEnabled as isAvModerationEnabled,
    isSupported as isAvModerationSupported
} from '../../../av-moderation/functions';
import { openDialog } from '../../../base/dialog/actions';
import { IconCheck } from '../../../base/icons/svg';
import { MEDIA_TYPE } from '../../../base/media/constants';
import {
    getParticipantCount,
    isEveryoneModerator,
    isLocalParticipantModerator
} from '../../../base/participants/functions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import ContextMenu from '../../../base/ui/components/web/ContextMenu';
import ContextMenuItemGroup from '../../../base/ui/components/web/ContextMenuItemGroup'; // Add this import
import { close } from '../../actions.web';
import {getParticipantPaneButtonProps} from '../../functions'

const useStyles = makeStyles()(theme => {
    return {
        // contextMenu: {
        //     bottom: 'auto',
        //     margin: '0',
        //     left: 'calc(50% - 141.5px)', // Adjust the left position as per your requirement
        //     top: '-8px',
        //     transform: 'translateY(-100%)',
        //     width: '283px'+
        //   },
        contextMenu: {
            bottom: 'auto',
            margin: '0',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            width: '200px'
          },
        text: {
            ...withPixelLineHeight(theme.typography.bodyShortRegular),
            color: theme.palette.text,
            padding: '10px 16px',
            height: '40px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box'
        },

        indentedLabel: {
            '& > span': {
                marginLeft: '36px'
            }
        }
    };
});

interface IProps {
    /**
     * Whether the menu is open.
     */
    isOpen: boolean;

    /**
     * Drawer close callback.
     */
    onDrawerClose: (e?: React.MouseEvent) => void;

    /**
     * Callback for the mouse leaving this item.
     */
    onMouseLeave?: (e?: React.MouseEvent) => void;

    // participantButtonClick
    // : (e?: React.MouseEvent) => void;

}
// export function isWebinarMenuOpen({ isOpen}:IProps) {
//    // console.log(isOpen)
// return    isOpen
// }

export const WebinarMenu = ({ isOpen, onDrawerClose, onMouseLeave }: IProps) => {
    console.log('webinarmenu:',isOpen)
    const dispatch = useDispatch();
      const isModerationSupported = useSelector((state: IReduxState) => isAvModerationSupported()(state));
    const allModerators = useSelector(isEveryoneModerator);
    const isModerator=useSelector(isLocalParticipantModerator)
    const participantCount = useSelector(getParticipantCount);
    const isAudioModerationEnabled = useSelector(isAvModerationEnabled(MEDIA_TYPE.AUDIO));
    const isVideoModerationEnabled = useSelector(isAvModerationEnabled(MEDIA_TYPE.VIDEO));

    const { t } = useTranslation();
    //const reduxState = useSelector((state: IReduxState) => state); // Assuming you have access to the Redux state
    
    //const participantPaneButtonProps = getParticipantPaneButtonProps(reduxState, isOpen);
    
    const disableAudioModeration = useCallback(() => dispatch(requestDisableAudioandVideoModerationforWebinar()), [dispatch]);
    const disableVideoModeration = useCallback(() => dispatch(requestDisableVideoModeration()), [dispatch]);
    const enableAudioModeration = useCallback(() => dispatch(requestEnableAudioandVideoModerationforWebinar()), [dispatch]);
    const enableVideoModeration = useCallback(() => dispatch(requestEnableVideoModeration()), [dispatch]);
    const { classes } = useStyles();

    const actions = [
        {
            accessibilityLabel: t('participantsPane.actions.webinaraudioModeration'),
            className: isAudioModerationEnabled ? classes.indentedLabel : '',
            id: isAudioModerationEnabled
                ? 'participants-pane-context-menu-stop-audio-moderation'
                : 'participants-pane-context-menu-start-audio-moderation',
            icon: isAudioModerationEnabled && IconCheck,
            onClick: isAudioModerationEnabled && isVideoModerationEnabled ? disableAudioModeration : enableAudioModeration,
            text: t('participantsPane.actions.webinaraudioModeration')
        }, 
        // {
        //     accessibilityLabel: t('participantsPane.actions.webinarvideoModeration'),
        //     className: isVideoModerationEnabled ? classes.indentedLabel : '',
        //     id: isVideoModerationEnabled
        //         ? 'participants-pane-context-menu-stop-video-moderation'
        //         : 'participants-pane-context-menu-start-video-moderation',
        //     icon: isVideoModerationEnabled && IconCheck,
        //     onClick: isVideoModerationEnabled ? disableVideoModeration : enableVideoModeration,
        //     text: t('participantsPane.actions.webinarvideoModeration')
        // },
    ];

    return (
        <ContextMenu
        className={classes.contextMenu}
        hidden={!isOpen}
        isDrawerOpen={isOpen}
        onDrawerClose={onDrawerClose}
        onMouseLeave={onMouseLeave}>     
               {/* {isModerationSupported && (participantCount === 1 || !allModerators) && (
                <div className={classes.text}>
                    <span>{t('participantsPane.actions.allow')}</span>
                </div>
            )} */}
            <ContextMenuItemGroup actions={actions} />
        </ContextMenu>
    );
};
