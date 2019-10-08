import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.25);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 20px;

      &::placeholder {

        color: #fff;
      }
    }

    > span {
      color: #f94d6a;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    > button {
      align-self: flex-end;

      display: flex;
      align-items: center;

      background: #f94d6a;
      margin: 5px 0 0;
      padding: 11px 23px;

      border: 0;
      border-radius: 4px;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f94d6a')}
      }

      svg {
        margin-right: 5px;
      }

      span {
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 0;
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
