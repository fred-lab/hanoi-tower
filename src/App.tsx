import Desk from "./components/Desk";
import { BoardProvider } from "./context/BoardContext";

function App() {
  return (
    <section className='bg-sky-700 w-full h-full flex flex-col'>
      <header className='bg-sky-800 h-20 flex items-center shadow-sm shadow-sky-900'>
        <h1 className='text-5xl text-blue-100 m-16 '>Tower of Hanoi</h1>
      </header>
      <BoardProvider>
        <Desk />
      </BoardProvider>
      <section className='text-blue-100 w-full bg-sky-600 p-5 mt-2'>
        <h2 className='text-2xl'>Rules</h2>
        <p className='text-lg ml-4 p-1'>1 - Only one disk may be moved at a time.</p>
        <p className='text-lg ml-4 p-1 tracking-wide'>
          2 - Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack
          or on an empty rod.
        </p>
        <p className='text-lg ml-4 p-1'>3 - No disk may be placed on top of a disk that is smaller than it.</p>
      </section>
      <footer className='bg-gray-600 text-blue-100  h-12 w-full flex justify-around items-center tracking-wide'>
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
