import { useRef, useEffect, useState } from 'react'
import { format } from 'date-fns'
import className from 'classnames'
import Avatar from './Avatar'
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'

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
  onEdit: (id: string, text: string) => void
}

const Message = ({
  id,
  text,
  createdAt,
  author,
  onDelete,
  onEdit,
}: MessageProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // TODO: Check if current authenticated user if the author of the message
  const isAuthor = false

  const [editing, setEditing] = useState(false)
  const [newText, setNewText] = useState(text)

  useEffect(() => {
    if (editing && textareaRef?.current) {
      textareaRef.current.focus()
    }
  }, [editing])

  const cancel = () => {
    setEditing(false)
    setNewText(text)
  }

  const save = () => {
    if (newText === text) {
      cancel()
    } else if (newText !== '') {
      setEditing(false)
      onEdit(id, newText)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Escape') {
      cancel()
    } else if (e.code === 'Enter') {
      save()
    }
  }

  return (
    <div className="group space-y-3 rounded-md p-3 hover:bg-gray-50">
      <div className="flex items-start justify-between space-x-6">
        <div className="flex w-full space-x-3">
          <div className="flex-shrink-0">
            <Avatar src={author?.avatarUrl} alt={author?.displayName} />
          </div>
          <div className="flex flex-col space-y-1">
            <span
              className={className('font-medium', isAuthor && 'text-blue-700')}
            >
              {author?.displayName || 'User'}
            </span>
            {createdAt ? (
              <span className="text-xs text-gray-500">
                {format(new Date(createdAt), 'dd/MM/yyyy - HH:mm')}
              </span>
            ) : null}
          </div>
        </div>

        {isAuthor && !editing ? (
          <div className="flex flex-1 space-x-2">
            {/* Edit message */}
            <button
              type="button"
              onClick={() => setEditing(true)}
              title="Edit message"
              className="text-gray-500 opacity-0 hover:text-current group-hover:opacity-100"
            >
              <PencilIcon className="h-5 w-5" />
            </button>

            {/* Delete message */}
            <button
              type="button"
              title="Delete message"
              onClick={() => onDelete(id)}
              className="text-gray-500 opacity-0 hover:text-current group-hover:opacity-100"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="ml-[3.25rem]">
        {editing ? (
          <div>
            <textarea
              ref={textareaRef}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded border-2 border-blue-500 bg-gray-100 p-2 focus:outline-none"
            />
            <p className="text-xs text-gray-500">
              escape to{' '}
              <button
                type="button"
                onClick={cancel}
                className="font-medium text-blue-600 hover:underline"
              >
                cancel
              </button>{' '}
              - enter to{' '}
              <button
                type="button"
                onClick={save}
                className="font-medium text-blue-600 hover:underline"
              >
                save
              </button>
            </p>
          </div>
        ) : (
          <p>{newText}</p>
        )}
      </div>
    </div>
  )
}

export default Message
