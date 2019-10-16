import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  saveMeetupSuccess,
  saveMeetupFailure,
  getDetailsFailure,
  getDetailsSuccess
} from './actions';

import history from '~/services/history';
import api from '~/services/api';

export function* saveMeetup({ payload }) {
  try {
    const data = payload.data;

    const { data: meetup } = yield call(api.post, 'meetups', data);

    yield put(saveMeetupSuccess(meetup));

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
