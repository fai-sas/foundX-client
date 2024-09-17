'use client'

import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/button'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'

import FormInput from '@/src/components/form/FormInput'

const CreatePostPage = () => {
  const methods = useForm()

  const { control, handleSubmit } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const postData = {
      ...data,
      questions: data.questions.map(
        (question: { value: string }) => question.value
      ), // in backend it is array of object, in front end we want to show it as array
    }

    console.log(postData)
  }

  const handleFieldAppend = () => {
    append({ name: 'questions' })
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput label='Title' name='title' />

          <Divider className='my-5' />

          <div className='flex items-center justify-between'>
            <h1 className='text-xl'>Owner verification questions</h1>
            <Button onClick={() => handleFieldAppend()}>Append</Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className='flex items-center'>
              <FormInput label='Question' name={`questions.${index}.value`} />
              <Button onClick={() => remove(index)}>Remove</Button>
            </div>
          ))}

          <Divider className='my-5' />

          <Button type='submit'>Post</Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default CreatePostPage
