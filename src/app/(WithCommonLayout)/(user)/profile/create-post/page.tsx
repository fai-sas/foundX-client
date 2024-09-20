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
import { allDistict } from '@bangladeshi/bangladesh-address'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useUser } from '@/src/context/user.provider'
import { useCreatePost } from '@/src/hooks/post.hook'
import Loading from '@/src/components/UI/Loading'
import { useGetCategories } from '@/src/hooks/categories.hook'
import dateToISO from '@/src/types/dateToISO'
import FormInput from '@/src/components/form/FormInput'
import FormDatePicker from '@/src/components/form/FormDatePicker'
import FormSelect from '@/src/components/form/FormSelect'
import FormTextarea from '@/src/components/form/FormTextArea'
import { AddIcon, TrashIcon } from '@/src/components/icons'

const cityOptions = allDistict()
  .sort()
  .map((city: string) => {
    return {
      key: city,
      label: city,
    }
  })

export default function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([])
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([])

  const router = useRouter()

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost()

  const { user } = useUser()

  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories()

  let categoryOption: { key: string; label: string }[] = []

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData.data
      .sort()
      .map((category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      }))
  }

  const methods = useForm()

  const { control, handleSubmit } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData()

    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: dateToISO(data.dateFound),
      user: user!._id,
    }

    formData.append('data', JSON.stringify(postData))

    for (let image of imageFiles) {
      formData.append('itemImages', image)
    }

    handleCreatePost(formData)
  }

  const handleFieldAppend = () => {
    append({ name: 'questions' })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    setImageFiles((prev) => [...prev, file])

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string])
      }

      reader.readAsDataURL(file)
    }
  }

  if (!createPostPending && isSuccess) {
    router.push('/')
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className='h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12'>
        <h1 className='text-2xl font-semibold'>Post a found item</h1>
        <Divider className='mt-3 mb-5' />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='flex-1 min-w-fit'>
                <FormInput label='Title' name='title' />
              </div>
              <div className='flex-1 min-w-fit'>
                <FormDatePicker label='Found date' name='dateFound' />
              </div>
            </div>
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='flex-1 min-w-fit'>
                <FormInput label='Location' name='location' />
              </div>
              <div className='flex-1 min-w-fit'>
                <FormSelect label='City' name='city' options={cityOptions} />
              </div>
            </div>
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='flex-1 min-w-fit'>
                <FormSelect
                  disabled={!categorySuccess}
                  label='Category'
                  name='category'
                  options={categoryOption}
                />
              </div>
              <div className='flex-1 min-w-fit'>
                <label
                  className='flex items-center justify-center w-full transition-all duration-100 border-2 shadow-sm cursor-pointer h-14 rounded-xl border-default-200 text-default-500 hover:border-default-400'
                  htmlFor='image'
                >
                  Upload image
                </label>
                <input
                  multiple
                  className='hidden'
                  id='image'
                  type='file'
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className='flex flex-wrap gap-5 my-5'>
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className='relative p-2 border-2 border-dashed size-48 rounded-xl border-default-300'
                  >
                    <img
                      alt='item'
                      className='object-cover object-center w-full h-full rounded-md'
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className='flex flex-wrap-reverse gap-2 py-2'>
              <div className='flex-1 min-w-fit'>
                <FormTextarea label='Description' name='description' />
              </div>
            </div>

            <Divider className='my-5' />

            <div className='flex items-center justify-between mb-5'>
              <h1 className='text-xl'>Owner verification questions</h1>
              <Button isIconOnly onClick={() => handleFieldAppend()}>
                <AddIcon />
              </Button>
            </div>

            <div className='space-y-5'>
              {fields.map((field, index) => (
                <div key={field.id} className='flex items-center gap-2'>
                  <FormInput
                    label='Question'
                    name={`questions.${index}.value`}
                  />
                  <Button
                    isIconOnly
                    className='w-16 h-14'
                    onClick={() => remove(index)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))}
            </div>

            <Divider className='my-5' />
            <div className='flex justify-end'>
              <Button size='lg' type='submit'>
                Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
