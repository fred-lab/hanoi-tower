import Desk from "./components/Desk";

function App() {
  return (
    <section
      className='bg-gray-300
     w-full h-full'
    >
      <h1>Hanoi Towers</h1>
      <Desk towers={3} />
    </section>
  );
}

export default App;
