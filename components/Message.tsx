import { useUserData } from '@nhost/nextjs'
import { format } from 'date-fns'
import className from 'classnames'
import Avatar from './Avatar'

export type MessageProps = {
  id: string
  text: string
  /** ISO 8601 format **/
  createdAt: string
  author: {
    id: string
    displayName: string
    avatarUrl: string
  }
}

const Message = ({ text, createdAt, author }: MessageProps) => {
  const user = useUserData()

  return (
    <div className="flex space-x-4 rounded-md p-2 hover:bg-gray-50">
      <Avatar src={author?.avatarUrl} alt={author?.displayName} />
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span
            className={className(
              'inline-block font-medium',
              author?.id === user?.id && 'text-blue-700'
            )}
          >
            {author?.displayName || 'User'}
          </span>
          {createdAt ? (
            <span className="inline-block text-xs text-gray-500">
              {format(new Date(createdAt), 'dd/MM/yyyy')}
            </span>
          ) : null}
        </div>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Message
