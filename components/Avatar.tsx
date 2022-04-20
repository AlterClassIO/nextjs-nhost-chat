import Image from 'next/image'

type AvatarProps = {
  src: string
  alt: string
}

const Avatar = ({ src = '', alt = '' }: AvatarProps) => (
  <div className="relative h-10 w-10 rounded-full bg-gray-200">
    {src ? <Image src={src} alt={alt} layout="fill" /> : null}
  </div>
)

export default Avatar
