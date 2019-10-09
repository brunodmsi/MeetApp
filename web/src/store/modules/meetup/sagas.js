import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { saveMeetupRequest, saveMeetupFailure } from './actions';

import history from '~/services/history';
import api from '~/services/api';

export function* saveMeetup({ payload }) {
  try {
    const meetup = payload.data;

    const response = yield call(api.post, 'meetups', meetup);

    const { banner_id, title, description, location } = response.data;

    yield put(saveMeetupRequest({ banner_id, title, description, location }));

    toast.success('Meetup criado com sucesso!');
    history.push('/dashboard');
  } catch(err) {
    const { message } = err.response.data;
    toast.error(`Ocorreu um erro ao criar o meetup. ${message}`);
    yield put(saveMeetupFailure());
  }
}

export default all([
  takeLatest('@meetup/SAVE_REQUEST', saveMeetup)
]);
