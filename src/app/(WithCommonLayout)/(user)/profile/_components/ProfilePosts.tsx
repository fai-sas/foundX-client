'use client'
import { format } from 'date-fns'
import { Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

import ImageGallery from '@/src/components/UI/Post/ImageGallery'
import { IReceivedClaimRequest } from '@/src/types'

type TProps = {
  post: IReceivedClaimRequest
}

export default function ProfilePosts({ post }: TProps) {
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
    </div>
  )
}
