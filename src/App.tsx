import Desk from "./components/Desk";
import { BoardProvider } from "./context/BoardContext";

function App() {
  return (
    <section className='bg-sky-700 w-full h-full flex flex-col'>
      <header className='bg-sky-800 h-20 flex items-center'>
        <h1 className='text-5xl text-blue-100 m-16'>Tower of Hanoi</h1>
      </header>
      <BoardProvider>
        <Desk towers={3} />
      </BoardProvider>
      <footer className='bg-sky-800 text-blue-100  h-16 w-full flex justify-around items-center'>
        <a href='https://github.com/fred-lab' target='_blank'>
          @Fred-lab
        </a>
        <a href='https://github.com/fred-lab/hanoi-tower' target='_blank'>
          Github Project
        </a>
        <a href='https://en.wikipedia.org/wiki/Tower_of_Hanoi' target='_blank'>
          Tower of Hanoi - Wikipedia
        </a>
      </footer>
    </section>
  );
}

export default App;
