import React from 'react';
import styled from 'styled-components';


const InputSuperStudent = styled.div`



& input{
  border: solid #ced4e8 1px;
  outline: none;
  border-radius: 25px;
  padding: 8px;
  padding-left: 10px;
  width: 100%;  
  margin-bottom: 15px;
  transition: all ease-in 0.2s;

  &::placeholder{
    text-align: right;
    padding-right: 10px;
  }

  &:focus{

    border:solid #0d6efd 1px;
    transform: scale(1.01);

  }
}


`;

export default function FCInput(props) {
  return (
    <InputSuperStudent>
      <input onChange={props.onChange} type={props.type} placeholder={props.label} />
    </InputSuperStudent>
  )
}
