import uniqid from 'uniqid';

export default function Questions (props){
    const {question, handleAnswers} = props
   
    return (
        <div className='questions--container'>
            {/* used dangerouslySetInnerHTML to be able to render text without the unicode*/}
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            {/* render answer choices */}
            {question.all_answers.map(qst => 
                <button
                key={uniqid()}
                    className={qst === question.selectedAnswer ? 'question-choice answer--selected':'question-choice'}
                    onClick={(event)=>handleAnswers(qst,question.id)}>
                        <span dangerouslySetInnerHTML={{ __html: qst}}></span>
                </button>)}        
        </div>
    )
}