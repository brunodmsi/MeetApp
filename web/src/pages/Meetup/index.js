import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import Banner from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

export default function Meetup({  }) {
  const dispatch = useDispatch();
  // const meetup = useSelector(state => state.meetups);

  function handleSubmit(data) {
    //dispatch(saveMeetupRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} >
        <Banner />

        <Input name="title" placeholder="Qual o título do Meetup" />
        <Input
          name="description"
          multiline
          rows="4"
          placeholder="Descrição do Meetup"
        />
        <Input name="date" type="date" placeholder="Quando será?" />
        {/* <DatePicker /> */}
        <Input name="location" placeholder="Onde será?" />

        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          <span>Salvar meetup</span>
        </button>
      </Form>
    </Container>
  );
}
