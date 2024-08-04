'use client'

import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { askQuestion } from './actions/question-actions'

function Question() {
  const [question, setQuestion] = useState('')
  const { mutate } = useMutation({
    mutationFn: askQuestion,
  })

  function askQuestionClient() {
    mutate(question)
  }

  return (
    <>
      <div className="flex flex-col px-5 max-w-xl">
        <div className="flex flex-row gap-2">
          <Input onChange={(event) => setQuestion(event.target.value)} />
          <Button
            className="w-32"
            disabled={question.length <= 10}
            onClick={() => askQuestionClient()}
          >
            Ask
          </Button>
        </div>
      </div>
    </>
  )
}

export default Question
