import React, { ComponentType, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isLocalParticipantModerator } from '../../base/participants/functions';
import { IReduxState } from '../../app/types';

/*
 * Props that will be passed by the AbstractPollsPane to its
 * concrete implementations (web/native).
 **/
export type AbstractProps = {
    createMode: boolean;
    onCreate: () => void;
    setCreateMode: (mode: boolean) => void;
    t: Function;
};

/**
 * Higher Order Component taking in a concrete PollsPane component and
 * augmenting it with state/behavior common to both web and native implementations.
 *
 * @param {React.AbstractComponent} Component - The concrete component.
 * @returns {React.AbstractComponent}
 */
const AbstractPollsPane = (Component: ComponentType<AbstractProps>) => () => {

    const [ createMode, setCreateMode ] = useState(false);
      // Assuming these are your selectors
      const isModerator = useSelector(isLocalParticipantModerator);
  
      const webinarEnabled = useSelector((state:IReduxState) => state['features/base/conference'].webinarEnabled)
     

    const onCreate = () => {
        setCreateMode(true);
    };

    const { t } = useTranslation();

    return(
    <>
     { !(webinarEnabled && !isModerator) && (
    <Component
        createMode = { createMode }
        /* eslint-disable react/jsx-no-bind */
        onCreate = { onCreate }
        setCreateMode = { setCreateMode }
        t = { t } />)}
        </>
        )
        
        

};

export default AbstractPollsPane;
