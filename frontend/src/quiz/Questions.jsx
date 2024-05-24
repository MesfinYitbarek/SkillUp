import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


/** Custom Hook */
import { useFetchQestion } from '../hooks/FetchQuestion'
import { updateResult } from '../hooks/setResult'


export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, apiData, serverError}] = useFetchQestion() 

    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateResult({ trace, checked}))
    }, [checked])
    
    function onSelect(i){
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked}))
    }


    if(isLoading) return <h3 className='text-blue'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

  return (
    <div className="questions p-4 md:p-8 bg-white shadow-lg rounded-lg">
    <h2 className="text-green-800 text-xl md:text-2xl font-semibold mb-4">{questions?.question}</h2>

    <ul key={questions?.id} className="space-y-2">
        {questions?.options.map((q, i) => (
            <li key={i} className="flex items-center space-x-2">
                <input 
                    type="radio"
                    value={false}
                    name="options"
                    id={`q${i}-option`}
                    onChange={() => onSelect(i)}
                    className="form-radio h-4 w-4 text-blue-600"
                />
                <label className="text-gray-700" htmlFor={`q${i}-option`}>{q}</label>
                <div className={`check ${result[trace] == i ? 'bg-blue-500 rounded-full w-3 h-3' : ''}`}></div>
            </li>
        ))}
    </ul>
</div>

  )
}
