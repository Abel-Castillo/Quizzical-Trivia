import {useState} from 'react'
import './index.css';
import QuizCover from './components/QuizCover'

function App() {
  const [coverPage, setCoverPage] = useState(false)
  const [questions, setQuestions] = useState(newQuestions())
  console.log(questions)

  function newQuestions (){
    const data = fetch('https://opentdb.com/api.php?amount=10')
    .then(response => response.json()).then(data => data.results)
    return data
  }
  newQuestions()
  // start the game and remove cover page
  function startQuiz (){
    setCoverPage(true)
  }
  return (
    <div className="App">
      {/* if coverPage is false show coverPage */}
      {!coverPage && <QuizCover startQuiz={startQuiz}/>}
    </div>
  );
}

export default App;
