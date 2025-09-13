import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
}

.recharts-surface:focus {
    outline: none;
}
`;

export default GlobalStyles;
