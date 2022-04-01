export default function Questions (props){
    const {question, handleAnswers} = props
    const typeBoolean = <div>
                <input className={'True' === question.selectedAnswer && 'answer--selected'} 
                type='button' value='True' onClick={(event)=>handleAnswers(event,question.id)}/>
                <input className={'False' === question.selectedAnswer && 'answer--selected'}
                type='button' value='False' onClick={(event)=>handleAnswers(event,question.id)}/>
            </div>  
        
    const typeMultiple = [...question.incorrect_answers,question.correct_answer ]
   
    return (
        <div>
            {/* used dangerouslySetInnerHTML to be able to render text without the unicode*/}
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            {question.type === 'boolean' && typeBoolean}
            {question.type === 'multiple' && typeMultiple.map(answer => 
                <input type='button' 
                    value={answer} 
                    className={answer === question.selectedAnswer && 'answer--selected'}
                    onClick={(event)=>handleAnswers(event,question.id)}/>)}        
        </div>
    )
}