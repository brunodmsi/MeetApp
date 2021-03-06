import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
  background: rgba(0, 0, 0, 0.8);
  border: ${props => props.error ? '1px solid red': 0};
  border-radius: 4px;
  font-size: 18px;
  color: #eee;
  opacity: 0.5;

  label {
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      background: #eee;
    }

    span {
      font-weight: bold;
    }

    input {
      display: none;
    }
  }
`;
