import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle` 
body{
    background-color:#f3f9f1
}
.buttonStyle{
    display:flex;
    justify-content:center;
    margin-top: 2rem
}
.grid {
    display: grid;
    gap: 9rem;
  }
.grid-two-column {
  grid-template-columns: repeat(2, 1fr);
}
.grid-three-column {
   grid-template-columns: repeat(3, 1fr);
}
.grid-four-column{
   grid-template-columns: 1fr 1.2fr .5fr .8fr ;
}

`