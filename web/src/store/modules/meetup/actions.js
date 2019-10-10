export function saveMeetupRequest(data) {
  return {
    type: '@meetup/SAVE_REQUEST',
    payload: { data }
  }
}

export function saveMeetupSuccess() {
  return {
    type: '@meetup/SAVE_SUCCESS'
  }
}

export function saveMeetupFailure() {
  return {
    type: '@meetup/SAVE_FAILURE'
  }
}

export function getDetailsRequest(id) {
  return {
    type: '@meetup/GET_DETAILS_REQUEST',
    payload: { id },
  }
}

export function getDetailsSuccess(data) {
  return {
    type: '@meetup/GET_DETAILS_SUCCESS',
    payload: { data },
  }
}

export function getDetailsFailure() {
  return {
    type: '@meetup/GET_DETAILS_FAILURE'
  }
}
