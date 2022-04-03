import { useState,useEffect} from 'react'
import uniqid from 'uniqid';
import './index.css';
import QuizCover from './components/QuizCover'
import Questions from './components/Questions'
import AnswerPage from './components/AnswerPage'

function App() {
   // use coverPage state to hide/show
   const [quizResults, setQuizResults] = useState({})
   const [coverPage, setCoverPage] = useState(true)
   const [answerPage, setAnswerPage]= useState(false)
  // initialitze the questions
  const [questions, setQuestions] = useState([])
  let restartQuiz = ''
 useEffect(()=>{
     fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(data => data.results)
      .then(data => {
       const dataAPI = data.map(d=> ({...d,id:uniqid(),selectedAnswer:''}))
       setQuestions(dataAPI)
      })
  },[coverPage]) 

  console.log(questions)
  
  function startQuiz (){
    // update the true or false coverPage
    setCoverPage(false)
  }
  function handleAnswers (question, id) {
    // Copy the questions state to modify the matching id's
    const qst = [...questions]
    const questionNumber = qst.findIndex(q => q.id === id)
    // if the id's match update the selectedAnswer with the choosen answer
    qst[questionNumber].selectedAnswer= question
    // update the state with the new modified questions array
    setQuestions(qst)
    }

    function checkAnswers () {
      setAnswerPage(true)
      let answered = 0
      const numberOfQuestions = questions.length
      questions.forEach(question => question.correct_answer === question.selectedAnswer && answered++)

      setQuizResults({questionsCorrect: answered, numberOfQuestions})
    }
    function resetQuiz (){
    
      setCoverPage(true)
      setAnswerPage(false)
    }

  return (
    <div className="App">
      {/* if coverPage is true show coverPage else display the questions */}
      {coverPage && <QuizCover startQuiz={startQuiz}/>} 
      {/* if coverPage is false and answer page is false show questions */}
      {coverPage === answerPage && <div className ='questions-page--container'>
        {questions.map(question => <Questions question={question} key={question.id} handleAnswers={handleAnswers}/>)}
        <button className ='btn btn--check-answer' onClick={checkAnswers}>Check Answer</button>
        </div>  
      }
      {/* if answer pgae is true show answers */}
      {answerPage && 
        <div className ='answer-page--container'>
          {questions.map(question => <AnswerPage question={question} key={question.id}/>)}
          <div className='answer-page--results'>
            <p>You scored {quizResults.questionsCorrect}/{quizResults.numberOfQuestions} correct answers</p>
            <button className ='btn btn--play-again'onClick={resetQuiz}>Play Again</button>
          </div>
        </div>  
      }
      
    </div>
  );
}

export default App;
