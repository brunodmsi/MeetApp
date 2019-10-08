import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt-BR';

import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups');

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = response.data.map(meetup => {
        const meetupDate = utcToZonedTime(parseISO(meetup.date), timezone);
        const formattedDate = format(meetupDate, "dd 'de' MMMM', às 'HH'h'", {
          locale: pt
        });

        return {
          id: meetup.id,
          title: meetup.title,
          date: formattedDate,
          past: meetup.past
        }
      })

      setMeetups(data);
    }

    loadMeetups();
  })

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <button type="button">
          <MdAddCircleOutline size={20} color="#fff" />
          <span>Novo meetup</span>
        </button>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id} past={meetup.past}>
            <span>{meetup.title}</span>
            <div>
              <span>{meetup.date}</span>
              <button type="button">
                <MdChevronRight size={24} color="#fff" />
              </button>
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
