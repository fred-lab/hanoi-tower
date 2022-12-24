import Desk from "./components/Desk";
import { BoardProvider } from "./context/BoardContext";

function App() {
  return (
    <section
      className='bg-gray-300
     w-full h-full'
    >
      <h1>Hanoi Towers</h1>
      <BoardProvider>
        <Desk towers={3} />
      </BoardProvider>
    </section>
  );
}

export default App;
