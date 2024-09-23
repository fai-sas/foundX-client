'use client'

import { Input } from '@nextui-org/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link } from '@nextui-org/link'
import { useRouter } from 'next/navigation'

import { SearchIcon } from '../../icons'

import { ISearchResult } from '@/src/types'
import { useSearchItems } from '@/src/hooks/search.hook'
import useDebounce from '@/src/hooks/debounce.hook'

export default function Landing() {
  const { register, handleSubmit, watch } = useForm()
  const { mutate: handleSearch, data, isPending, isSuccess } = useSearchItems()
  const [searchResults, setSearchResults] = useState<ISearchResult[] | []>([])
  const router = useRouter()

  const searchTerm = useDebounce(watch('search'))

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm)
    }
  }, [searchTerm])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleSeeAll(data.search)
  }

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(' ').join('+')

    router.push(`/found-items?query=${queryString}`)
  }

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data?.hits ?? [])
    }
  }, [isPending, isSuccess, data, searchTerm])

  return (
    <div className="h-[calc(100vh-64px)] bg-[url('/glass.jpg')] bg-cover bg-center">
      <div className='flex-1 max-w-xl pt-32 mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex-1'>
            <Input
              {...register('search')}
              aria-label='Search'
              classNames={{
                inputWrapper: 'bg-default-100',
                input: 'text-sm',
              }}
              placeholder='Search...'
              size='lg'
              startContent={
                <SearchIcon className='flex-shrink-0 text-base pointer-events-none text-default-400' />
              }
              type='text'
            />
          </div>
        </form>
        {searchResults.length > 0 && (
          <div className='p-3 mt-2 rounded-xl bg-default-100'>
            <div className='space-y-3'>
              {searchResults.map((item, index) => (
                <Link
                  key={index}
                  className='block p-2 transition-all rounded-md text-default-900 from-default-200 hover:bg-gradient-to-l'
                  href={`/found-items/${item.id}`}
                >
                  <div>
                    <div className='flex items-center gap-2'>
                      <img
                        alt='item'
                        className='w-20 h-20 rounded-md'
                        src={item.thumbnail}
                      />
                      <div>
                        <p className='text-lg font-semibold'>{item.title}</p>
                        <p className='w-full h-12 mt-1 text-sm line-clamp-2'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className='flex justify-center pt-3 mt-3 border-t-1 border-default-50'>
              <button
                className='flex items-center justify-center gap-1'
                onClick={() => handleSeeAll(searchTerm)}
              >
                <span>See All</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
