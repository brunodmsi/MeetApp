import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt-BR';

import { MdAddCircleOutline, MdChevronRight, MdLoop } from 'react-icons/md';

import api from '~/services/api';

import { Container, Meetup } from './styles';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);

  const meetupsAmount = useMemo(() => meetups.length, [meetups]);

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get('/organizer');

      try {
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
      } catch (err) {
        setMeetups([])
        toast.error('Aconteceu algo de errado...');
      } finally {
        setLoading(false);
      }
    }

    loadMeetups();
  }, [])

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
        {loading ? (
          <MdLoop size={40} color="#fff" />
        )
        : !meetupsAmount
          ? (
          <Meetup>
            <span>Você não tem nenhum meetup registrado</span>
            <div>
              <span>:(</span>
            </div>
          </Meetup>
        )
        : meetups.map(meetup => (
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
