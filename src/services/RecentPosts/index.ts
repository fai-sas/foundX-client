// import envConfig from '@/src/config/envConfig'

import axiosInstance from '@/src/lib/AxiosInstance'

export const getRecentPosts = async () => {
  const fetchOption = {
    next: {
      tags: ['posts'],
    },
  }

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_API}/items?sortBy=-createdAt&limit=9`,

  //   fetchOption
  // )

  const res = await axiosInstance.get(`/items?sortBy=-createdAt&limit=9`)

  return res.data
}
