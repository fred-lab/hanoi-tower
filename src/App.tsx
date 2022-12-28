import Desk from "./components/Desk";
import { BoardProvider } from "./context/BoardContext";
import { motion } from "framer-motion";
import { GameIcon } from "./components/Icons";

function App() {
  return (
    <section className='bg-sky-700 w-full h-full flex flex-col'>
      <header className='bg-sky-800 h-20 flex items-center shadow-sm shadow-sky-900'>
        <motion.span
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 6 }}
          className='ml-8'
        >
          <GameIcon className='w-20 h-20 fill-white' />
        </motion.span>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className='text-5xl text-blue-100 ml-8 '
        >
          Tower of Hanoi
        </motion.h1>
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
        <a href='https://www.buymeacoffee.com/fredlab' target='_blank' className='text-amber-500'>
          Buy me a coffee
        </a>
      </footer>
    </section>
  );
}

export default App;
