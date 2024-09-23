'use client'

import { format } from 'date-fns'
import { Calendar, Eye, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Avatar } from '@nextui-org/avatar'
import { useState } from 'react'

import ImageGallery from './ImageGallery'

import { IClaimant, IReceivedClaimRequest } from '@/src/types'

type TProps = {
  post: IReceivedClaimRequest
}

export default function ClaimPostCard({ post }: TProps) {
  const {
    claimRequests,
    title,
    dateFound,
    description,
    location,
    city,
    _id,
    images,
  } = post || {}

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [answers, setAnswers] = useState({})

  const handleAnswers = (data: Record<string, any>) => {
    setAnswers(data)
    setIsModalOpen(true)
  }

  return (
    <div className='p-4 mb-2 rounded-md bg-default-100'>
      <div className='pb-2 border-b border-default-200'>
        <div className='py-4 border-b border-default-200'>
          <div className='flex items-start justify-between mb-4'>
            <div>
              <Link href={`/found-items/${_id}`}>
                <h1 className='text-2xl cursor-pointer'>{title}</h1>
              </Link>
              <p className='flex items-center gap-1 text-xs'>
                Found on: <Calendar width={14} />
                {format(new Date(dateFound), 'dd MMM, yyyy')}
              </p>
            </div>
            <div>
              <p className='flex items-center gap-1'>
                <MapPin width={18} />
                {location}, {city}
              </p>
            </div>
          </div>
          <p>{description}</p>
        </div>

        <ImageGallery images={images} />
      </div>

      <div>
        {claimRequests?.map((claimRequest) => {
          const { claimant, answers, description: comment, _id } = claimRequest
          const { profilePhoto, name } = claimant as IClaimant

          return (
            <div
              key={_id}
              className='flex items-center w-full gap-2 mx-auto my-3'
            >
              <Avatar isBordered name='Test' radius='sm' src={profilePhoto} />
              <div className='flex w-full items-center justify-between rounded-md bg-default-200 px-4 py-2 dark:bg-[#333335]'>
                <div>
                  <p className='text-xs text-default-600'>{name}</p>
                  <p>{comment}</p>
                </div>
                <Eye
                  className='cursor-pointer'
                  onClick={() => handleAnswers({ answers: answers, id: _id })}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
