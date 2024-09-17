import Link from 'next/link'

type LinkItem = {
  href: string
  label: string
}

export const SidebarOptions = ({ links }: { links: LinkItem[] }) => {
  return (
    <div className='flex flex-col gap-1'>
      {links.map((link) => (
        <Link
          key={link.href}
          className='block w-full px-3 py-2 rounded-md hover:bg-default-200'
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
