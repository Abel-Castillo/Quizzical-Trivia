export default function Questions (props){
    const {question, handleAnswers} = props
    const typeBoolean = <div>
                <input type='button' value='True' name='true' onClick={(event)=>handleAnswers(event,question.id)}/>
                <input type='button' value='False' name='false' onClick={(event)=>handleAnswers(event,question.id)}/>
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
                    name={answer} 
                    className={answer === question.selectedAnswer && 'answer--selected'}
                    onClick={(event)=>handleAnswers(event,question.id)}/>)}
        </div>
    )
}