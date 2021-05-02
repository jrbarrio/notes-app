import './App.css';
import Description from './components/Description';
import Message from './components/Message'

function App() {
  return (
    <div className="App">
      <Message color='red' message="Estamos trabajando en ello..."></Message>
      <Description></Description>
    </div>
  );
}

export default App;
