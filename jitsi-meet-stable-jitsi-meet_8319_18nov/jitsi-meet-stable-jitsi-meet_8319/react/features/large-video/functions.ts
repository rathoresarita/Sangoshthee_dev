import { IReduxState } from '../app/types';
import { getParticipantById ,getModeratorById,getOneModerator,getLastModeratorId,getDominantSpeakerOrLastModeratorId} from '../base/participants/functions';

/**
 * Selector for the participant currently displaying on the large video.
 *
 * @param {Object} state - The redux state.
 * @returns {Object}
 */
export function getLargeVideoParticipant(state: IReduxState) {
    const { participantId } = state['features/large-video'];

    return getParticipantById(state, participantId ?? '');
}

export function getLargeModeratorVideo(state: IReduxState) {

    
   // const  participantId = getDominantSpeakerOrLastModeratorId(state)
   const { participantId } = state['features/large-video'];

    console.log('participantId LAST MODERATOR',participantId )

    return getModeratorById(state, participantId ?? '');
}


// export function getModeratorById(state:IReduxState){
    
//     const { participantIds } = state['features/large-video'];


    
//     // Check if the participant has the 'moderator' role
//     if (participantIds.role === 'moderator') {
//         return moderator;
//     }

//     return undefined;
// }


