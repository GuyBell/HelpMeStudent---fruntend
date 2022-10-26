import React from 'react';
import styled from 'styled-components';


const Button=styled.button` 

background: white;
border:solid #08D9D6 1px;
padding:5px 15px 5px 15px;
width: 100%;
border-radius: 25px;
transition: all ease-in-out 0.1s;
margin-top: 10px;

&:hover{
  background: #08D9D6 ;
  color:white
}`;

export default function FCButton(props) {
  return (
    <Button onClick={props.onClick}>{props.children}</Button>
  )
}