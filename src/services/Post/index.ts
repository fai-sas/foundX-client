'use server'

import { revalidateTag } from 'next/cache'

import axiosInstance from '@/src/lib/AxiosInstance'

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    revalidateTag('posts')

    return data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create post')
  }
}
