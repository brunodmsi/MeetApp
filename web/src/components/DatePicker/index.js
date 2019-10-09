import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';

import { Picker } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ selectedDate }) {
  const { fieldName, registerField } = useField('date');
  const [selected, setSelected] = useState(
    selectedDate ? parseISO(selectedDate) : ''
  );

  const ref = useRef();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      }
    })
  }, [ref.current]);

  return (
    <Picker
      name={fieldName}
      selected={selected}
      onChange={date => setSelected(date)}
      showTimeSelect
      timeIntervals={30}
      timeCaption="time"
      ref={ref}
      placeholderText="Quando será?"
      dateFormat='Pp'
    />
  );
}

DatePicker.propTypes = {
  selectedDate: PropTypes.string,
}

DatePicker.defaultProps = {
  selectedDate: null,
}
