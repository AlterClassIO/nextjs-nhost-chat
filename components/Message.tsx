import { format } from 'date-fns'
import Avatar from './Avatar'

type MessageProps = {
  text: string
  /** ISO 8601 format **/
  createdAt: string
  user: {
    displayName: string
    avatarUrl: string
  }
}

const Message = ({ text, createdAt, user }: MessageProps) => {
  return (
    <div className="flex space-x-4 rounded-md p-2 hover:bg-gray-50">
      <Avatar src={user?.avatarUrl} alt={user?.displayName} />
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="inline-block font-medium text-blue-700">
            {user?.displayName || 'User'}
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
