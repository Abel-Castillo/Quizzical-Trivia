import { useState} from 'react'
import uniqid from 'uniqid';
import './index.css';
import QuizCover from './components/QuizCover'
import Questions from './components/Questions'

function App() {
  // use coverPage state to hide/show
  const [coverPage, setCoverPage] = useState(false)
  // initialitze the questions
  const [questions, setQuestions] = useState(fetchQuestions)
  // save the answers input
  const [answers, setAnswers] = useState([])
  console.log(questions)
  // get the questions from API 
  async function fetchQuestions () {
    let data = await fetch('https://opentdb.com/api.php?amount=10')
    .then(response => response.json()).then(data => data.results)
     data = data.map(d=> ({...d,id:uniqid(),selectedAnswer:''}))
      
    setQuestions(data)
    // return statement to prevent error leak
    return data
  }
  
  function startQuiz (){
    // update the true or false coverPage
    setCoverPage(true)
  }
  function handleAnswers (e, id) {
    // Copy the questions state to modify the matching id's
    const qst = [...questions]
    const questionNumber = questions.findIndex(q => q.id === id)
    // if the id's match update the selectedAnswer with the choosen answer
    qst[questionNumber].selectedAnswer= e.target.name
    // update the state with the new modified questions array
    setQuestions(qst)

    }
  console.log(answers)
  return (
    <div className="App">
      {/* if coverPage is false show coverPage else display the questions */}
      {!coverPage? <QuizCover startQuiz={startQuiz}/> : 
      questions.map(question => <Questions question={question} key={question.id} handleAnswers={handleAnswers}/>)}
      
    </div>
  );
}

export default App;
