import { useUserData } from '@nhost/nextjs'
import { format } from 'date-fns'
import className from 'classnames'
import Avatar from './Avatar'
import { TrashIcon } from '@heroicons/react/outline'

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
  onDelete: (id: string) => void
}

const Message = ({ id, text, createdAt, author, onDelete }: MessageProps) => {
  const user = useUserData()

  const isAuthor = author?.id === user?.id

  return (
    <div className="group flex items-start justify-between space-x-4 rounded-md p-2 hover:bg-gray-50">
      <div className="flex space-x-4">
        <Avatar src={author?.avatarUrl} alt={author?.displayName} />
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span
              className={className(
                'inline-block font-medium',
                isAuthor && 'text-blue-700'
              )}
            >
              {author?.displayName || 'User'}
            </span>
            {createdAt ? (
              <span className="inline-block text-xs text-gray-500">
                {format(new Date(createdAt), 'dd/MM/yyyy - HH:mm')}
              </span>
            ) : null}
          </div>
          <p>{text}</p>
        </div>
      </div>

      {isAuthor ? (
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="text-gray-500 opacity-0 hover:text-current group-hover:opacity-100"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  )
}

export default Message
