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
  //setUpQuiz detemines when to fetch new API data
  const [setUpQuiz, setSetUpQuiz] = useState(false)
 useEffect(()=>{
     fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(data => data.results)
      .then(data => {
       const dataAPI = data.map(d=> ({...d,id:uniqid(),selectedAnswer:''}))
       setSetUpQuiz(false)
       setQuestions(dataAPI)
      })
  },[setUpQuiz]) 

  console.log(questions)
  
  function startQuiz (){
    // Starting the quiz will randomize the multiple choice answers
    randomizeChoices()
    // update the true to false coverPage to hide coverPage
    setCoverPage(false)
  }
  function randomizeChoices () {
    const randomAllAnswers = questions.map(question =>{
      // create a new property all_answers to store all the random multiple choices
      let all_answers = [...question.incorrect_answers]
      const randomIndex = Math.floor(Math.random()* (question.incorrect_answers.length +1))
      // don't randomize choices for True or False questions
      if(question.incorrect_answers.length === 1){
        all_answers = ['True', 'False']
      } else{
        all_answers.splice(randomIndex,0,question.correct_answer)
      }
      
      return {...question, all_answers}
    })
    setQuestions(randomAllAnswers)
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
      setSetUpQuiz(true)
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
