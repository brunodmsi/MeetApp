import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// import { Container } from './styles';

export default function Details() {
  const meetup = useSelector(state => state.meetup.data);

  return (
    <h1>Details {meetup.title}</h1>
  );
}
