import { useState } from 'react'

type FormProps = {
  onSubmit?: (newMessage: string) => void
}

const Form = ({ onSubmit = () => null }: FormProps) => {
  const [value, setValue] = useState('')

  const handleOnSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(value)
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex items-center justify-between space-x-4 rounded-md bg-gray-200"
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
        className="pr-4 text-sm font-medium uppercase text-gray-600 hover:text-current"
      >
        Send
      </button>
    </form>
  )
}

export default Form
