import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import { toast } from 'react-toastify';

import Banner from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

import api from '~/services/api';

import { saveMeetupRequest } from '~/store/modules/meetup/actions';
import { parseISO } from 'date-fns';

export default function Meetup(props) {
  const dispatch = useDispatch();
  const [meetup, setMeetup] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetup(id) {
      setLoading(true);
      const { data: meetup } = await api.get(`/meetup/${id}`);
      console.tron.log(meetup);

      try {
        const data = {
          ...meetup,
          date: parseISO(meetup.date)
        }

        console.tron.log(data);

        setMeetup(data);
      } catch(err) {
        setMeetup([])
        setLoading(false);
        toast.error('Aconteceu algum erro ao carregar');
      } finally {
        setLoading(false);
      }
    }

    if (props.location.state) {
      const { id } = props.location.state;
      loadMeetup(id);
    } else {
      setLoading(false);
    }
  }, [])

  function handleSubmit(data) {
    dispatch(saveMeetupRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={meetup} >
        <Banner name="file_id" />

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
