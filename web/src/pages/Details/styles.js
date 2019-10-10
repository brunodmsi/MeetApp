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

    margin-bottom: 50px;

    strong {
      color: #fff;
      font-size: 30px;
      font-weight: bold;
    }

    div {
      align-self: flex-end;

      display: flex;
      align-items: center;

      button {
        height: 44px;

        margin: 5px 0 0;
        padding: 11px 20px;

        border: 0;
        border-radius: 4px;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: background 0.2s;

        span {
          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }

        svg {
          margin-right: 10px;
        }
      }

      .edit {
        background-color: #4DB9FF;

        &:hover {
          background: ${darken(0.03, '#4DB9FF')}
        }
      }

      .delete {
        margin-left: 20px;
        background-color: #D73F57;

        &:hover {
          background: ${darken(0.03, '#D73F57')}
        }
      }
    }
  }

  section {
    img {
      width: 100%;
      height: 300px;
      margin-bottom: 20px;
      border-radius: 4px;
      border: 0;
      object-fit: cover;
    }

    p {
      color: #fff;
      font-size: 16px;
      word-break: break-all;

      margin-bottom: 30px;
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;

    span {
      display: flex;

      svg {
        margin-right: 8px;
      }

      color: #fff;
      opacity: 0.6;
      font-size: 16px;

      font-style: normal;
    }

    span + span {
      margin-left: 30px;
    }
  }
`;
