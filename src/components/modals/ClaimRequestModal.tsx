import { Button } from '@nextui-org/button'
import { FieldValues, SubmitHandler } from 'react-hook-form'

import FormController from '../form/FormController'
import FormInput from '../form/FormInput'
import FormTextarea from '../form/FormTextArea'

import ModalController from './ModalController'

import { useAddClaimRequest } from '@/src/hooks/claimRequest.hook'

interface IProps {
  id: string
  questions: string[]
}

export default function ClaimRequestModal({ id, questions }: IProps) {
  const { mutate: handleClaimRequest, isPending } = useAddClaimRequest()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const claimRequestData = {
      item: id,
      description: data.description,
      answers: Object.keys(data)
        .filter((formElement) => formElement.startsWith('answer'))
        .map((answer) => data[answer]),
    }

    handleClaimRequest(claimRequestData)
  }

  return (
    <ModalController
      buttonClassName='flex-1'
      buttonText='Claim Request'
      title='Claim Request'
    >
      <FormController onSubmit={onSubmit}>
        {questions.map((question, index) => (
          <div key={index} className='mb-4'>
            <p className='mb-1'>{question}</p>
            <FormInput
              label={`Answer - ${index + 1}`}
              name={`answer-${index + 1}`}
            />
          </div>
        ))}

        <FormTextarea label='Description' name='description' />

        <div>
          <Button className='flex-1 w-full my-2' size='lg' type='submit'>
            {isPending ? 'Sending....' : 'Send'}
          </Button>
        </div>
      </FormController>
    </ModalController>
  )
}
