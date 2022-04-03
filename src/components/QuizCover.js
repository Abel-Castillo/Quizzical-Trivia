
export default function QuizCover (props) {
    return(
        <div className ='cover--container'>
            <h1 className='cover--title'>Quizzical</h1>
            <p className='cover--slogan'>Ready for the trivia game!?</p>
            <button className='btn cover--btn' onClick={props.startQuiz}>Start Quiz</button>
            
        </div>
    )
}