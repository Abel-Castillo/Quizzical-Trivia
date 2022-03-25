export default function Questions (props){
    const {question} = props
    const typeBoolean = <div><button>True</button><button>False</button></div>
    const typeMultiple = [...question.incorrect_answers,question.correct_answer ]
    console.log(typeMultiple)
    return (
        <div>
            {/* used dangerouslySetInnerHTML to be able to render text without the unicode*/}
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>

            {question.type === 'boolean' && typeBoolean}
            {question.type === 'multiple' && typeMultiple.map(answer => <button>{answer}</button>)}
        </div>
    )
}