import { useState } from 'react'
import toast from 'react-hot-toast'

export type FormProps = {
  onSubmit?: (newMessage: string) => void
}

const Form = ({ onSubmit = () => null }: FormProps) => {
  const [value, setValue] = useState('')

  const handleOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await onSubmit(value)
      setValue('')
    } catch (err) {
      // Something went wrong!
      toast.error('Unable to send message', { id: 'sendMessage' })
    }
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex items-center justify-between space-x-4 rounded-md bg-gray-200 pr-4"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message here..."
        className="w-full text-ellipsis bg-transparent px-4 py-3 focus:outline-none"
      />
      <button
        type="submit"
        className="text-sm font-medium uppercase text-gray-600 hover:text-current"
      >
        Send
      </button>
    </form>
  )
}

export default Form
