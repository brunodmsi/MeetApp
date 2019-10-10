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
    const meetup = payload.data;

    yield call(api.post, 'meetups', meetup);

    yield put(saveMeetupSuccess());

    toast.success('Meetup criado com sucesso!');
    history.push('/dashboard');
  } catch(err) {
    const { message } = err.response.data;
    toast.error(`Ocorreu um erro ao criar o meetup. ${message}`);
    yield put(saveMeetupFailure());
  }
}

export function* getDetails({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `meetup/${id}`);

    const { data } = response;

    yield put(getDetailsSuccess(data));
  } catch(err) {
    const { message } = err.response.data;
    toast.error(`Ocorreu um erro ao achar o meetup. ${message}`);
    yield put(getDetailsFailure());
  }
}

export default all([
  takeLatest('@meetup/SAVE_REQUEST', saveMeetup),
  takeLatest('@meetup/GET_DETAILS_REQUEST', getDetails)
]);
