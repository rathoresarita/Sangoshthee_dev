// @flow
import { batch } from 'react-redux';
import type { Dispatch } from 'redux';

import {
    createToolbarEvent,
    sendAnalytics
} from '../../analytics';
import { TILE_VIEW_ENABLED, getFeatureFlag } from '../../base/flags';
import { translate } from '../../base/i18n';
import { IconTileView } from '../../base/icons';
import { connect } from '../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox/components';
import { setOverflowMenuVisible } from '../../toolbox/actions';
import { setTileView } from '../actions';
import { shouldDisplayTileView } from '../functions';
import logger from '../logger';
import { isLocalParticipantModerator } from '../../base/participants/functions';
import { shouldDisplayTileViewForModerator } from '../functions.any';

/**
 * The type of the React {@code Component} props of {@link TileViewButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether or not tile view layout has been enabled as the user preference.
     */
    _tileViewEnabled: boolean,

    /**
     * Used to dispatch actions from the buttons.
     */
    dispatch: Dispatch<any>
};

/**
 * Component that renders a toolbar button for toggling the tile layout view.
 *
 * @augments AbstractButton
 */
class TileViewButton<P: Props> extends AbstractButton<P, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.tileView';
    icon = IconTileView;
    label = 'toolbar.enterTileView';
    toggledLabel = 'toolbar.exitTileView';
    tooltip = 'toolbar.tileViewToggle';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        const { _tileViewEnabled, dispatch } = this.props;
        const { webinarEnabled, isModerator } = this.props; // Add these lines

        // Check whether the button should be clickable based on webinar and moderator status
        const isClickable = !( webinarEnabled && !isModerator);
console.log('isClickable', isClickable);
        if (isClickable) {
            const value = !_tileViewEnabled;
console.log('isClickableIf', isClickable);
            sendAnalytics(createToolbarEvent(
                'tileview.button',
                {
                    'is_enabled': value
                }));

            logger.debug(`Tile view ${value ? 'enable' : 'disable'}`);
            batch(() => {
                dispatch(setTileView(value));
                navigator.product !== 'ReactNative' && dispatch(setOverflowMenuVisible(false));
            });
        }

    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._tileViewEnabled;
    }

    /**
     * Override the default behavior to apply a disabled state when the button is not clickable.
     *
     * @override
     * @protected
     * @returns {Object}
     */
    _getButtonProps() {
        const buttonProps = super._getButtonProps();
        const { webinarEnabled, isModerator } = this.props; // Add these lines

console.log('isClickableB', buttonProps.isClickable);
        // If the button is not clickable, set the 'disabled' attribute
        if (!this._isClickable() && webinarEnabled&& !isModerator) {
            buttonProps.disabled = true;
        }

        return buttonProps;
    }

    /**
     * Checks whether the button should be clickable based on webinar and moderator status.
     *
     * @private
     * @returns {boolean}
     */
    _isClickable() {
        const { _tileViewEnabled } = this.props;
        const { webinarEnabled, isModerator } = this.props; // Add these lines


        return !(_tileViewEnabled === false && webinarEnabled && !isModerator);
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code TileViewButton} component.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component instance.
 * @returns {Props}
 */
function _mapStateToProps(state, ownProps) {
    const isModerator = isLocalParticipantModerator(state);
    const webinarEnabled = state['features/base/conference'].webinarEnabled;
    const enabled = getFeatureFlag(state, TILE_VIEW_ENABLED, true);
    const disabled = getFeatureFlag(state, TILE_VIEW_ENABLED, false);

    const { visible = enabled } = ownProps;
    const { visibleP = disabled } = ownProps;

    if (webinarEnabled && !isModerator) {
        return {
            _tileViewEnabled: false,
            visible:false
        };
    } else {
        return {
            _tileViewEnabled: shouldDisplayTileView(state),
            visible
        };
    }
}

export default translate(connect(_mapStateToProps)(TileViewButton));
