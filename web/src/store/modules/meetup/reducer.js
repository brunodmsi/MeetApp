import produce from 'immer';


const INITIAL_STATE = {
  meetup: null,
}

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch(action) {
      case '@meetup/SAVE_REQUEST':
        draft.meetup = action.payload
        break;

      case '@meetup/SAVE_FAILURE':
        draft.meetup = null;
        break;
    }
  })
}
