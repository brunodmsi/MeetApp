import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  data: null,
}

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch(action.type) {
      case '@meetup/GET_DETAILS_REQUEST': {
        draft.id = action.payload.id;
        break;
      }

      case '@meetup/GET_DETAILS_SUCCESS': {
        draft.data = action.payload.data;
        break;
      }

      case '@meetup/GET_DETAILS_FAILURE': {
        draft.id = null;
        break;
      }

      case '@meetup/SAVE_REQUEST': {
        draft.id = null;
        break;
      }

      case '@meetup/SAVE_SUCCESS': {
        draft.id = null;
        break;
      }

      case '@meetup/SAVE_FAILURE': {
        draft.id = null;
        break;
      }
    }
  })
}
