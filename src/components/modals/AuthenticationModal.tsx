'use client'

import { Button } from '@nextui-org/button'
import Link from 'next/link'

import ModalController from './ModalController'

interface IProps {
  id: string
}

const AuthenticationModal = ({ id }: IProps) => {
  return (
    <ModalController
      buttonClassName='flex-1'
      buttonText='Claim Item'
      title='Authentication'
    >
      <div>
        You are not currently logged in. Please login first to continue.
      </div>
      <div className='flex gap-2 mt-2 mb-4'>
        <Link className='flex-1' href={`/register?redirect=found-items/${id}`}>
          <Button className='w-full'>Register</Button>
        </Link>
        <Link className='flex-1' href={`/login?redirect=found-items/${id}`}>
          <Button className='w-full'>Login</Button>
        </Link>
      </div>
    </ModalController>
  )
}

export default AuthenticationModal
