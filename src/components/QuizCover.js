
export default function QuizCover (props) {
    return(
        <div className ='cover--container'>
            <h1>Quizzical</h1>
            <p>Ready for the trivia game!?</p>
            <button className='btn cover--btn' onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}