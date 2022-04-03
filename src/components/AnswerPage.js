export default function AnswerPage (props){
    const {question} = props
    const allQuestions = [...question.incorrect_answers, question.correct_answer]    
    

    
    console.log(question)
                
    const checkResults = allQuestions.map(qst => {
            
            if(question.correct_answer === qst && question.selectedAnswer === qst){
                return <button 
                className='correct--answer question-choice'
                value={qst}><span dangerouslySetInnerHTML={{ __html: qst}}></span></button>
            }
            if(question.correct_answer === qst && question.selectedAnswer === ''){
                return <button 
                className='unselected-answer right--answer question-choice'
                value={qst}><span dangerouslySetInnerHTML={{ __html: qst}}></span></button>
            }
            if(question.correct_answer === qst){
                return <button 
                className='unselected-answer right--answer question-choice'
                value={qst}><span dangerouslySetInnerHTML={{ __html: qst}}></span></button>
            }
            if(question.selectedAnswer !== qst) {
                return <button 
                className='unselected-answer question-choice'
                value={qst}><span dangerouslySetInnerHTML={{ __html: qst}}></span></button>
            }
            if(question.selectedAnswer !== question.correct_answer ){
                return <button 
                className='incorrect--answer question-choice'
                value={qst}><span dangerouslySetInnerHTML={{ __html: qst}}></span></button>
            }
            
        }
    )
                         
    return(
        <div className='questions--container'>
            {/* used dangerouslySetInnerHTML to be able to render text without the unicode*/}
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            {/* render all answer choices */}
            {checkResults}            
        </div>
    )
}