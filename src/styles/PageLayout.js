import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'column'};
  justify-content: ${props => props.justifyContent || 'normal'};
  margin: 100px 100px 0;
  align-items: ${props => props.alignItems || 'center'};
`