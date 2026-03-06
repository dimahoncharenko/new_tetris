import { MainWrapper } from "./styled";

import { Game } from "./components/Game";

function App() {
  return (
    <MainWrapper>
      <Game rows={24} cols={16} />
    </MainWrapper>
  );
}

export default App;
