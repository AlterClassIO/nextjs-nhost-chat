import { useRef, useEffect, useState } from 'react'
import { useUserData } from '@nhost/nextjs'
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
  const inputRef = useRef<HTMLInputElement>(null)

  const user = useUserData()
  const isAuthor = author?.id === user?.id

  const [editing, setEditing] = useState(false)
  const [newText, setNewText] = useState(text)

  useEffect(() => {
    if (editing && inputRef?.current) {
      inputRef.current.focus()
    }
  }, [editing])

  const cancel = () => {
    setEditing(false)
    setNewText(text)
  }

  const save = () => {
    if (newText !== '' && newText !== text) {
      setEditing(false)
      onEdit(id, newText)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Escape') {
      cancel()
    } else if (e.code === 'Enter') {
      save()
    }
  }

  return (
    <div className="group flex items-start justify-between space-x-6 rounded-md p-3 hover:bg-gray-50">
      <div className="flex flex-1 space-x-4">
        <Avatar src={author?.avatarUrl} alt={author?.displayName} />
        <div className="w-full space-y-1">
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
          {editing ? (
            <>
              <input
                ref={inputRef}
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded border-2 bg-gray-100 p-2 focus:outline-none"
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
            </>
          ) : (
            <p>{newText}</p>
          )}
        </div>
      </div>

      {isAuthor && !editing ? (
        <div className="flex-shrink-0 space-x-2">
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
  )
}

export default Message
