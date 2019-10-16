import produce from 'immer';

const INITIAL_STATE = {
  id: null,
}

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch(action.type) {
      case '@meetup/SAVE_REQUEST': {
        draft.id = null;
        break;
      }

      case '@meetup/SAVE_SUCCESS': {
        draft.id = action.payload.id;
        break;
      }

      case '@meetup/SAVE_FAILURE': {
        draft.id = null;
        break;
      }
    }
  })
}
