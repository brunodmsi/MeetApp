import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    strong {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }

    button {
      align-self: flex-end;

      display: flex;
      align-items: center;

      background-color: #f94d6a;
      margin: 5px 0 0;
      padding: 11px 23px;

      border: 0;
      border-radius: 4px;

      transition: background 0.2s;

      &:hover {
        background-color: ${darken(0.03, '#f94d6a')}
      }

      svg {
        margin-right: 5px;
      }

      span {
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 0;
      }
    }
  }

  ul {
    margin-top: 30px;
  }
`;

export const Meetup = styled.div`
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
  width: 100%;
  border-radius: 4px;
  padding: 20px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: ${props => props.past ? 0.6 : 1};

  & + & {
    margin-top: 10px;
  }

  > span {
    font-weight: bold;
    font-size: 18px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;

    > span {
      font-size: 16px;
      color: #eee;
      opacity: 0.6;
    }

    button {
      background: none;
      border: 0;
      margin-left: 20px;
      color: #fff;

      transition: color 0.2s;

      &:hover {
        color: ${darken(0.02, "#fff")};
      }

      svg {
        margin-top: 4px;
      }
    }
  }
`;
