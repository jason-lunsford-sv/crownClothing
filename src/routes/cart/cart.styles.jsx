import styled from 'styled-components';

export const CartWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const CartDetails = styled.div`
  border: 1px solid black;
  margin: 50px 0 0 25px;
  padding: 30px;
  width: 300px;
`;

export const CartContainer = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
  width: 100%;
`;

export const CartHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

export const Total = styled.p`
  font-size: 24px;
  margin: 0 0 50px;
`;