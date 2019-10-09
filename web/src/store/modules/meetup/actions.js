export function saveMeetupRequest(data) {
  return {
    type: '@meetup/SAVE_REQUEST',
    payload: { data }
  }
}

export function saveMeetupFailure() {
  return {
    type: '@meetup/SAVE_FAILURE'
  }
}
