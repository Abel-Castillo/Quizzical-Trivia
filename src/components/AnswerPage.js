import Questions from "./Questions"

export default function AnswerPage (props){
    const {question} = props
    const allQuestions = [...question.incorrect_answers, question.correct_answer]    
    

    
    console.log(question)
                
    const checkResults = allQuestions.map(qst => {
            
            if(question.correct_answer === qst && question.selectedAnswer === qst){
                return <input type='button'
                className='correct--answer'
                value={qst}/>
            }
            if( question.correct_answer === qst){
                return <input type='button'
                className={'right--answer'}
                value={qst}/>
            }
            if(question.selectedAnswer !== qst) {
                return <input type='button'
                value={qst}/>
            }
            
            if(question.selectedAnswer !== question.correct_answer ){
                return <input type='button'
                className='incorrect--answer'
                value={qst}/>
            }
        }
    )
                         
               
            
    
    return(
        <div>
            
            {/* used dangerouslySetInnerHTML to be able to render text without the unicode*/}
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            {checkResults}
            {/* render all answer choices */}
            {/* {allQuestions.map(answer => 
                <input type='button' 
                    value={answer} 
                    className={answer === question.selectedAnswer && 'answer--selected'}
                    />)}     */}
                        
        </div>
    )
}