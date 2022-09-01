import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

export const StyledAtag = styled.a`
  color: ${props => props.color || "black"};
  text-decoration: none;
  
  :hover {
    color: ${props => props.hover || "none"};
    cursor: pointer;
  }
`