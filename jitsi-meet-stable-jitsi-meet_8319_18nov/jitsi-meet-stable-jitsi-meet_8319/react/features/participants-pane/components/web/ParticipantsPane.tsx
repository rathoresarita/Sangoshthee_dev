import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import participantsPaneTheme from '../../../base/components/themes/participantsPaneTheme.json';
import { hideDialog, openDialog } from '../../../base/dialog/actions';
import { IconCloseLarge, IconDotsHorizontal } from '../../../base/icons/svg';
import { isLocalParticipantModerator } from '../../../base/participants/functions';
import Button from '../../../base/ui/components/web/Button';
import ClickableIcon from '../../../base/ui/components/web/ClickableIcon';
import { BUTTON_TYPES } from '../../../base/ui/constants.web';
import { findAncestorByClass } from '../../../base/ui/functions.web';
import { isAddBreakoutRoomButtonVisible } from '../../../breakout-rooms/functions';
import MuteEveryoneDialog from '../../../video-menu/components/web/MuteEveryoneDialog';
//import EnableWebinarMode from '../../../video-menu/components/web/EnableWebinarMode';
//import { DisableParticipantPane } from './DisableParticipantPane';
// import WebinarDialog from '../../../video-menu/components/web/WebinarDialog';
import WebinarDialog from '../../../video-menu/components/web/WebinarDialog';

import { close } from '../../actions.web'
import {
    getParticipantsPaneOpen,
    isMoreActionsVisible,
    isMuteAllVisible,
    isEnableWebinarModeVisible,
    getParticipantPaneButtonProps,
    getWebinarOpen
} from '../../functions';
import {WebinarMenu} from './WebinarMenu';
import { enableWebinar ,disableWebinar} from '../../actions.web';
import { getWebinarOn } from '../../../base/conference/functions';





import { AddBreakoutRoomButton } from '../breakout-rooms/components/web/AddBreakoutRoomButton';
// eslint-disable-next-line lines-around-comment
// @ts-ignore
import { RoomList } from '../breakout-rooms/components/web/RoomList';

import { FooterContextMenu } from './FooterContextMenu';
import LobbyParticipants from './LobbyParticipants';
import MeetingParticipants from './MeetingParticipants';


const useStyles = makeStyles()(theme => {
    return {
        container: {
            boxSizing: 'border-box' as const,
            flex: 1,
            overflowY: 'auto' as const,
            position: 'relative' as const,
            padding: `0 ${participantsPaneTheme.panePadding}px`,

            [`& > * + *:not(.${participantsPaneTheme.ignoredChildClassName})`]: {
                marginTop: theme.spacing(3)
            },

            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },

        closeButton: {
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center'
        },

        header: {
            alignItems: 'center',
            boxSizing: 'border-box' as const,
            display: 'flex',
            height: `${participantsPaneTheme.headerSize}px`,
            padding: '0 20px',
            justifyContent: 'flex-end'
        },

        antiCollapse: {
            fontSize: 0,

            '&:first-child': {
                display: 'none'
            },

            '&:first-child + *': {
                marginTop: 0
            }
        },

        footer: {
            display: 'flex',
            justifyContent: 'flex-end',
            padding: `${theme.spacing(4)} ${participantsPaneTheme.panePadding}px`,

            '& > *:not(:last-child)': {
                marginRight: theme.spacing(3)
            }
        },

        footerMoreContainer: {
            position: 'relative' as const
        },
        WebinarMode: {
            position: 'relative' as const,
            
        }
    };
});

const ParticipantsPane = () => {
    const { classes } = useStyles();
    const paneOpen = useSelector(getParticipantsPaneOpen);
    const WebinarOpen = useSelector(getWebinarOpen);

    const WebinarOn=useSelector(getWebinarOn)
    const isBreakoutRoomsSupported = useSelector(
        (state: IReduxState) => state['features/base/conference']
    ).conference?.getBreakoutRooms()?.isSupported();
    const showAddRoomButton = useSelector(isAddBreakoutRoomButtonVisible);
    const showFooter = useSelector(isLocalParticipantModerator);
    const showMuteAllButton = useSelector(isMuteAllVisible);
    const showWebinarModeButton = useSelector(isEnableWebinarModeVisible);
    const showMoreActionsButton = useSelector(isMoreActionsVisible);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [contextOpen, setContextOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchString, setSearchString] = useState('');

    const onClosePane = useCallback(() => {
        
        dispatch(close());
        
    }, []);

    const onDrawerClose = useCallback(() => {
        setContextOpen(false);
    }, []);
    const onDisableWebinar=useCallback(()=>{
        dispatch(disableWebinar());
        

    },[])

    const onMuteAll = useCallback(() => {
        dispatch(openDialog(MuteEveryoneDialog));
    }, []);

    const onWebinarEnabled=useCallback(()=>{
        dispatch(openDialog(WebinarDialog));
    },[])

    const onEnableWebinar = useCallback(() => {
        console.log('webinarO:',WebinarOpen)
        
        dispatch(enableWebinar());

        console.log('w',WebinarOpen)
        


    }, []);

    const onToggleContext = useCallback(() => {
        setContextOpen(open => !open);
    }, []);

    // const participantButtonClick = useCallback(() => {
    //     if (showFooter && showMoreActionsButton) {
    //         onToggleContext();
    //     }
    //     else{
    //         return null;
    //     }
    // }, [showFooter, showMoreActionsButton, onToggleContext]);

    if (!paneOpen) {
        return null;
    }
    if(paneOpen && showFooter==false && WebinarOn){
        //dispatch(close())
        onClosePane()
    }
   
   

    return (
        <div className='participants_pane'>
            <div className='participants_pane-content'>
                <div className={classes.header}>
                    <ClickableIcon
                        accessibilityLabel={t('participantsPane.close', 'Close')}
                        icon={IconCloseLarge}
                        onClick={onClosePane}
                    />
                </div>
                <div className={classes.container}>
                    <LobbyParticipants />
                    <br className={classes.antiCollapse} />
                    <MeetingParticipants searchString={searchString} setSearchString={setSearchString} />
                    {isBreakoutRoomsSupported && <RoomList searchString={searchString} />}
                    {showAddRoomButton && <AddBreakoutRoomButton />}
                </div>
                {showFooter && (
                    <div className={classes.footer}>
                        {showMuteAllButton && (
                            <Button
                                accessibilityLabel={t('participantsPane.actions.muteAll')}
                                labelKey={'participantsPane.actions.muteAll'}
                                onClick={onMuteAll}
                                type={BUTTON_TYPES.SECONDARY}
                            />
                        )}

{showWebinarModeButton && (
                            <div className={classes.WebinarMode}>
                                <Button
                                    accessibilityLabel={t('participantsPane.actions.webinarMode')}
                                    labelKey={'participantsPane.actions.webinarMode'}
                                    onClick={onWebinarEnabled}
                                    type={BUTTON_TYPES.SECONDARY}
                                />
                            
                               

                            </div>
                        )}
                        
                        {/* {showWebinarModeButton && (
                            <div className={classes.WebinarMode}>
                                <Button
                                    accessibilityLabel={t('participantsPane.actions.webinarMode')}
                                    labelKey={'participantsPane.actions.webinarMode'}
                                    onClick={onEnableWebinar}
                                    type={BUTTON_TYPES.SECONDARY}
                                />
                            
                                <WebinarMenu 
                                
                                isOpen={WebinarOpen} 
                                onDrawerClose={onDrawerClose}
                                //participantButtonClick={participantButtonClick}
                               onMouseLeave={onDisableWebinar}
                                />
                                


                            </div>
                        )} */}
                        {showMoreActionsButton && (
                            <div className={classes.footerMoreContainer}>
                                <Button
                                    accessibilityLabel={t('participantsPane.actions.moreModerationActions')}
                                    icon={IconDotsHorizontal}
                                    id='participants-pane-context-menu'
                                    onClick={onToggleContext}
                                    type={BUTTON_TYPES.SECONDARY}
                                />
                                <FooterContextMenu
                                    isOpen={contextOpen}
                                    onDrawerClose={onDrawerClose}
                                    onMouseLeave={onToggleContext}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParticipantsPane;
