import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import { toast } from 'react-toastify';

import Banner from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

import api from '~/services/api';

import { saveMeetupRequest, getDetailsFailure } from '~/store/modules/meetup/actions';

export default function Meetup() {
  const dispatch = useDispatch();
  const meetup_id = useSelector(state => state.meetup.id);
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`/meetups/${meetup_id}`);

        setMeetup(response.data);
      } catch(err) {
        setMeetup([]);
        const { message } = err.response.data;
        toast.error(`Aconteceu um erro. ${message}`);
      }
    }

    if (meetup_id) {
      loadMeetup();
    }
  }, [meetup_id])

  function handleSubmit(data) {
    dispatch(saveMeetupRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={meetup} >
        <Banner />

        <Input name="title" placeholder="Qual o título do Meetup" />
        <Input
          name="description"
          multiline
          rows="4"
          placeholder="Descrição do Meetup"
        />

        <DatePicker />

        <Input name="location" placeholder="Onde será?" />

        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          <span>Salvar meetup</span>
        </button>
      </Form>
    </Container>
  );
}
