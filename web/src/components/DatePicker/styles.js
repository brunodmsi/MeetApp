import styled from 'styled-components';
import DatePicker from 'react-datepicker';

export const Picker = styled(DatePicker)`
  width: 100%;

  cursor: pointer;

  color: #fff;

  &::placeholder {
    color: #fff;
  }
`;
