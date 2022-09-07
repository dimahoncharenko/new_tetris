import styled from "styled-components";

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.img`
  object-fit: contain;
  max-width: 100%;
`;

export const MainHeading = styled.h1`
  font-family: "Press Start 2P", cursive;
  text-align: center;
`;

export const StartButton = styled.button`
  --offset: 0.2em;

  padding: 1em 2em;
  background-color: white;
  border-radius: 0.5em;
  font-size: min(1.5rem, 5vw);
  box-shadow: 0em var(--offset) 0em 0em lightgray;
  transition: all 0.2s linear;
  font-family: "Press Start 2P", cursive;
  text-transform: uppercase;

  &:active {
    transform: translateY(var(--offset));
    box-shadow: 0em 0em 0em 0em lightgray, inset 0em 0em 0.2em 0.05em lightgray;
  }
`;
