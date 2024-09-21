// import envConfig from '@/src/config/envConfig'

export const getRecentPosts = async () => {
  const fetchOption = {
    next: {
      tags: ['posts'],
    },
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/items?sortBy=-createdAt&limit=9`,
    fetchOption
  )

  return res.json()
}
