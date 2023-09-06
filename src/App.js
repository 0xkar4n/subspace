
import CountdownTimer from './Timer';
import  './sub.png'
function App() {
  return (
    <div  className='relative '>
      <a href='https://subspace.network/'>
      <img src={require('./sub.png')} height={50} width={200} ></img>
        </a>
      
      <div class="w-24 h-24 absolute rounded-full top-60 left-80y m-2  bg-blue-500"></div>
      <div class="w-14 h-14 absolute rounded-full top-40 left-60  bg-violet-600"></div>
      <div class="w-14 h-14 absolute rounded-full bottom-10 right-80 m-2  bg-blue-500"></div>

      <div class="w-12 h-12 absolute rounded-full right-12 top-40  bg-red-500"></div>
      <CountdownTimer />

      
     
    </div>
  );
}

export default App;
