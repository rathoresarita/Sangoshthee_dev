// // @flow
// import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';
// /**
//  * The type of the React {@code Component} props of
//  * {@link AbstractRecordButton}.
//  */
// export type Props = AbstractButtonProps & {

//     /**
//      * True if the button needs to be disabled.
//      */
//     _disabled: Boolean,

//     /**
//      * True if there is a running active recording, false otherwise.
//      */
//     _isRecordingRunning: boolean,

//     /**
//      * The tooltip to display when hovering over the button.
//      */
//     _tooltip: ?String,

//     _isOpen:boolean

//     /**
//      * The redux {@code dispatch} function.
//      */
//     dispatch: Function,

//     /**
//      * The i18n translate function.
//      */
//     t: Function
// };

// /**
//  * An abstract implementation of a button for starting and stopping recording.
//  */
// export default class AbstractParticipantPaneButton<P: Props> extends AbstractButton<P, *> {
   
//     /**
//      * Returns the tooltip that should be displayed when the button is disabled.
//      *
//      * @private
//      * @returns {string}
//      */
//     _getTooltip() {
//         return this.props._tooltip || '';
//     }

//     /**
//      * Helper function to be implemented by subclasses, which should be used
//      * to handle the start recoding button being clicked / pressed.
//      *
//      * @protected
//      * @returns {void}
//      */
//     _onHandleClick() {
//         // To be implemented by subclass.
//     }

//     /**
//      * Handles clicking / pressing the button.
//      *
//      * @override
//      * @protected
//      * @returns {void}
//      */
    
//     /**
//      * Helper function to be implemented by subclasses, which must return a
//      * boolean value indicating if this button is disabled or not.
//      *
//      * @override
//      * @protected
//      * @returns {boolean}
//      */
//     _isDisabled() {
//         return this.props._disabled;
//     }

//     /**
//      * Indicates whether this button is in toggled state or not.
//      *
//      * @override
//      * @protected
//      * @returns {boolean}
//      */
//     _isToggled() {
//         return this.props._isRecordingRunning;
//     }
// }

// /**
//  * Maps (parts of) the redux state to the associated props for the
//  * {@code RecordButton} component.
//  *
//  * @param {Object} state - The Redux state.
//  * @private
//  * @returns {{
//  *     _disabled: boolean,
//  *     _isRecordingRunning: boolean,
//  *     _tooltip: string,
//  *     visible: boolean
//  * }}
//  */
// export function _mapStateToProps(state: Object): Object {
//     const {
//         disabled: _disabled,
//         tooltip: _tooltip,
//         visible
//     } = getParticipantPaneButtonProps(state);



    

//     return {
//         _disabled,
//         _isOpen
//         _tooltip,
//         visible
//     };
// }


