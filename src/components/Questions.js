export default function Questions (props){
    const {question, handleAnswers} = props
    const allQuestions = [...question.incorrect_answers,question.correct_answer ]
   
    return (
        <div className='questions--container'>
            {/* used dangerouslySetInnerHTML to be able to render text without the unicode*/}
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            {/* render answer choices */}
            {allQuestions.map(qst => 
                <button
                    className={qst === question.selectedAnswer ? 'question-choice answer--selected':'question-choice'}
                    onClick={(event)=>handleAnswers(qst,question.id)}>
                        <span dangerouslySetInnerHTML={{ __html: qst}}></span>
                </button>)}        
        </div>
    )
}