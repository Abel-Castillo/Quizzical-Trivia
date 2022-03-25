export default function Questions (props){
    const {question} = props
    return (
        <div>
            <p>{question.question}</p>
        </div>
    )
}