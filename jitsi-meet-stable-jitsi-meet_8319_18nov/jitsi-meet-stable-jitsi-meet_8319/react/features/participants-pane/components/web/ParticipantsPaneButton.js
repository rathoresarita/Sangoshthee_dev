// @flow
import React from 'react';

import { translate } from '../../../base/i18n';
import { IconUsers } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';
//import {  getParticipantButtonProps } from '../../../recording/functions';
import {getParticipantPaneButtonProps,getWebinarMenuOpen} from '../../functions'
import ParticipantsCounter from './ParticipantsCounter';
import ParticipantsPane from './ParticipantsPane';
import { isLocalParticipantModerator ,isParticipantLocal} from '../../../base/participants';


/**
 * The type of the React {@code Component} props of {@link ParticipantsPaneButton}.
 */
type Props = AbstractButtonProps & {
  /**
   * True if the button needs to be disabled.
   */
  //_isDisabled: boolean,

  /**
   * Whether or not the participants pane is open.
   */
  _isOpen: boolean,


  /**
     * True if the button needs to be disabled.
     */
  _disabled: Boolean,

    
  
};

/**
 * Implementation of a button for accessing participants pane.
 */
class ParticipantsPaneButton extends AbstractButton<Props, *> {
  accessibilityLabel = 'toolbar.accessibilityLabel.participants';
  icon = IconUsers;
  label = 'toolbar.participants';
  tooltip = 'toolbar.participants';

  /**
   * Indicates whether this button is in toggled state or not.
   *
   * @override
   * @protected
   * @returns {boolean}
   */
  _isToggled() {

    return this.props._isOpen;
  }


  /**
   * Overrides AbstractButton's {@link Component#render()}.
   *
   * @override
   * @protected
   * @returns {React$Node}
   */
  render(): React$Node {
    const { visible } = this.props;

    return (
      <div className="toolbar-button-with-badge">
        {super.render()}
        {visible && <ParticipantsCounter />} 

    
      </div>
    );
  }
}


/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function mapStateToProps(state) {
  
//const { isOpen } = state['features/participants-pane'];
 const { visible} = getParticipantPaneButtonProps(state);
//const { isOpen } = state['features/participants-pane'];
console.log('IsOpen prop:', visible);


    return {
    visible,
    
    };




}

export default translate(connect(mapStateToProps)(ParticipantsPaneButton));
