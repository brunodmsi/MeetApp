export function saveMeetupRequest(data) {
  return {
    type: '@meetup/SAVE_REQUEST',
    payload: { data }
  }
}

export function saveMeetupSuccess(id) {
  return {
    type: '@meetup/SAVE_SUCCESS',
    payload: { id }
  }
}

export function saveMeetupFailure() {
  return {
    type: '@meetup/SAVE_FAILURE'
  }
}
