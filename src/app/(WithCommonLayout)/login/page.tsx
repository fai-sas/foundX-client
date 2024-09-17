'use client'

import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'

import FormController from '@/src/components/form/FormController'
import FormInput from '@/src/components/form/FormInput'
import loginValidationSchema from '@/src/schemas/login.schema'

const LoginPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  // const { setIsLoading: userLoading } = useUser()

  const redirect = searchParams.get('redirect')

  // const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <div className='flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center'>
      <h3 className='my-2 text-2xl font-bold'>Login with FoundX</h3>
      <p className='mb-4'>Welcome Back! Let&lsquo;s Get Started</p>
      <div className='w-[35%]'>
        <FormController
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className='py-3'>
            <FormInput label='Email' name='email' type='email' />
          </div>
          <div className='py-3'>
            <FormInput label='Password' name='password' type='password' />
          </div>

          <Button
            className='w-full my-3 font-semibold rounded-md bg-default-900 text-default'
            size='lg'
            type='submit'
          >
            Login
          </Button>
        </FormController>
        <div className='text-center'>
          Don&lsquo;t have account ? <Link href={'/register'}>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
