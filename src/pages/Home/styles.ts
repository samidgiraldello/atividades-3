import styled from "styled-components"

export const Home = styled.section`
  picture {
    display: flex
  }
  picture > img {
    width: 100%;
  }
  aside {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 0.5rem;
  }
  h1 {
    text-align: center;
  }
`
