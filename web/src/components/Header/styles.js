import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #191621;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    img {
      height: 30px;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 20px;
    margin-top: 4px;

    strong {
      display: block;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #999
    }
  }

  button {
    background: #d44059;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    padding: 13px 20px;
    border: 0;
    border-radius: 4px;
  }
`;
