import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <Game />
      </div>
    </div>
  );
}

export default App;
