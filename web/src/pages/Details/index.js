import React, { useMemo, useEffect, useState } from 'react';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { toast } from 'react-toastify';

import { MdEdit, MdDeleteForever, MdRoom, MdEvent, MdLoop } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history'

import { Container } from './styles';

export default function Details(props) {
  const [meetup, setMeetup] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetup(id) {
      setLoading(true);

      let { data: meetup } = await api.get(`/meetup/${id}`);

      try {
        meetup.date = format(
          parseISO(meetup.date),
          "d 'de' MMMM', às 'HH'h'",
          {
            locale: pt,
          }
        )

        setMeetup(meetup);
      } catch(err) {
        setMeetup([])
        toast.error('Aconteceu algum erro ao carregar');
      } finally {
        setLoading(false);
      }
    }

    const { id } = props.match.params;
    loadMeetup(id);
  }, [])

  function handleEdit(id) {
    history.push('/meetup', { id })
  }

  return (
    <Container>
      {loading
      ? <MdLoop size={40} color="#fff" />
      :
      (
        <>
          <header>
            <strong>{meetup.title}</strong>
            <div>
              <button className="edit" onClick={() => handleEdit(meetup.id)} disabled={meetup.past}>
                <MdEdit color="#fff" size={20} />
                <span>Editar</span>
              </button>
              <button className="delete" disabled={meetup.past}>
                <MdDeleteForever color="#fff" size={20} />
                <span>Cancelar</span>
              </button>
            </div>
          </header>

          <section>
            <img src={meetup.banner.url} alt={meetup.title}/>
            <p>{meetup.description}</p>
          </section>

          <footer>
            <span>
              <MdRoom color="#fff" size={20} />
              {meetup.date}
            </span>
            <span>
              <MdEvent color="#fff" size={20} />
              {meetup.location}
            </span>
          </footer>
        </>
      )}
    </Container>
  );
}
