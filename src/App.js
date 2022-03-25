import {useEffect, useState} from 'react'
import uniqid from 'uniqid';
import './index.css';
import QuizCover from './components/QuizCover'
import Questions from './components/Questions'

function App() {
  const [coverPage, setCoverPage] = useState(false)
  const [questions, setQuestions] = useState(fetchQuestions)
  console.log(questions)
  
  async function fetchQuestions () {
    let data = await fetch('https://opentdb.com/api.php?amount=10')
    .then(response => response.json()).then(data => data.results)
     data = data.map(d=> ({...d,id:uniqid()}))
      
    setQuestions(data)
    return data
  }
  
  function startQuiz (){
    setCoverPage(true)
  }

  return (
    <div className="App">
      {/* if coverPage is false show coverPage else display the questions */}
      {!coverPage? <QuizCover startQuiz={startQuiz}/> : 
      questions.map(question => <Questions question={question} key={question.id}/>)}
      
    </div>
  );
}

export default App;
