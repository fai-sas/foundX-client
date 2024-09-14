import { useMutation } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'

import registerUser from '../services/AuthService'

const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['USER_REGISTRATION'],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success('User Registration Successful')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export default useUserRegistration
