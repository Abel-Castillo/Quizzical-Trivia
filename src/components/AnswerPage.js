import uniqid from 'uniqid';

export default function AnswerPage (props){
    const {question} = props
                
    const checkResults = question.all_answers.map(qst => {
            
            if(question.correct_answer === qst && question.selectedAnswer === qst){
                return <button 
                key={uniqid()}
                className='correct--answer question-choice'
                value={qst}><span dangerouslySetInnerHTML={{ __html: qst}}></span></button>
            }
            if(question.correct_answer === qst && question.selectedAnswer === ''){
                return <button 
                key={uniqid()}
                className='unselected-answer right--answer question-choice'
                value={qst}><span dangerouslySetInnerHTML={{ __html: qst}}></span></button>
            }
            if(question.correct_answer === qst){
                return <button 
                key={uniqid()}
                className='unselected-answer right--answer question-choice'
                value={qst}><span dangerouslySetInnerHTML={{ __html: qst}}></span></button>
            }
            if(question.selectedAnswer !== qst) {
                return <button 
                key={uniqid()}
                className='unselected-answer question-choice'
                value={qst}><span dangerouslySetInnerHTML={{ __html: qst}}></span></button>
            }
            if(question.selectedAnswer !== question.correct_answer ){
                return <button 
                key={uniqid()}
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