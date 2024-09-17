import { ReactNode } from 'react'

import Container from '@/src/components/UI/Container'
import Sidebar from '@/src/components/UI/Sidebar'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container>
        <div className='flex w-full gap-12 my-3'>
          <div className='w-2/5'>
            <Sidebar />
          </div>
          <div className='w-4/5'>{children}</div>
        </div>
      </Container>
    </>
  )
}
