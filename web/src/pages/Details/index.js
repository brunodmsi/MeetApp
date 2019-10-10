import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { MdEdit, MdDeleteForever, MdRoom, MdEvent } from 'react-icons/md';

import { Container } from './styles';

export default function Details() {
  const meetup = useSelector(state => state.meetup.data);

  const dateFormatted = useMemo(
    () => meetup.date
          ? format(parseISO(meetup.date), "d 'de' MMMM', às 'HH'hh'", {
            locale: pt,
          })
          : ''
  )

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <div>
          <button className="edit">
            <MdEdit color="#fff" size={20} />
            <span>Editar</span>
          </button>
          <button className="delete">
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
          {dateFormatted}
        </span>
        <span>
          <MdEvent color="#fff" size={20} />
          {meetup.location}
        </span>
      </footer>
    </Container>
  );
}
