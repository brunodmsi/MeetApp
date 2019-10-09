import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';

import Picker from 'react-datepicker';

// import { Picker } from './styles';

export default function DatePicker({ selectedDate }) {
  const { fieldName, registerField } = useField('date');
  const [selected, setSelected] = useState(
    selectedDate ? parseISO(selectedDate) : new Date()
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
      selected={selected}
      onChange={date => setSelected(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
    // <Picker
    //   name={fieldName}
    //   selected={selected}
    //   onChange={date => setSelected(date)}
    //   ref={ref}
    //   placeholderText="Quando será?"
    //   showTimeSelect
    //   dateFormat='Pp'
    // />
  );
}

DatePicker.propTypes = {
  selectedDate: PropTypes.string,
}

DatePicker.defaultProps = {
  selectedDate: null,
}
