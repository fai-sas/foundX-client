import { Card as NextUiCard } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'

const CardSkeleton = () => {
  return (
    <NextUiCard className='h-[300px] w-full rounded-3xl'>
      <Skeleton className='rounded-lg'>
        <div className='rounded-lg h-60 bg-default-300' />
      </Skeleton>
      <div className='flex items-center justify-between p-2'>
        <div className='w-3/4'>
          <Skeleton className='w-2/5 my-2 rounded-lg'>
            <div className='w-2/5 h-3 rounded-lg bg-default-200' />
          </Skeleton>
          <Skeleton className='w-3/5 rounded-lg'>
            <div className='w-3/5 h-3 rounded-lg bg-default-200' />
          </Skeleton>
        </div>
        <div className='w-1/4'>
          <Skeleton className='w-full my-2 rounded-full'>
            <div className='w-full h-8 rounded-full bg-default-200' />
          </Skeleton>
        </div>
      </div>
    </NextUiCard>
  )
}

export default CardSkeleton
