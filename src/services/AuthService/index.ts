'use server'

import { FieldValues } from 'react-hook-form'
import { cookies } from 'next/headers'

import axiosInstance from '@/src/lib/AxiosInstance'

const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/register', userData)

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken)

      cookies().set('refreshToken', data?.data?.refreshToken)
    }

    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

export default registerUser
