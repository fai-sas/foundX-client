import { Card as NextUiCard, CardHeader, CardFooter } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { format } from 'date-fns'

import { IPost } from '@/src/types'

const Card = ({ post }: { post: IPost }) => {
  const { title, category, images, city, dateFound, _id } = post || {}

  return (
    <NextUiCard isFooterBlurred className='h-[300px] w-full'>
      <CardHeader className='absolute z-10 flex-col items-start top-1'>
        <p className='absolute px-2 uppercase bg-black rounded-full -top-0 right-1 text-tiny text-white/90'>
          {category?.name}
        </p>
        <h4 className='p-1 mt-2 text-2xl font-medium text-white rounded bg-black/30'>
          {title}
        </h4>
      </CardHeader>

      <Image
        removeWrapper
        alt='Card example background'
        className='z-0 object-cover w-full h-full -translate-y-6 scale-120'
        src={images[0]}
      />
      <CardFooter className='absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30'>
        <div>
          <p className='text-black text-tiny'>{city}</p>
          <p className='text-black text-tiny'>
            {format(new Date(dateFound), 'dd MMMM, yyyy')}
          </p>
        </div>

        <Button
          className='text-white bg-black text-tiny'
          radius='full'
          size='sm'
        >
          Details
        </Button>
      </CardFooter>
    </NextUiCard>
  )
}

export default Card
