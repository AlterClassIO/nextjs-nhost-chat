import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/outline'
import Avatar from './Avatar'

export type UserMenuProps = {
  email?: string | undefined
  displayName: string | undefined
  avatarUrl: string | undefined
}

const UserMenu = ({ email, displayName, avatarUrl }: UserMenuProps) => {
  // TODO: Implement logging out user

  return (
    <Menu as="div" className="relative z-50">
      <Menu.Button className="group flex items-center space-x-px">
        <Avatar src={avatarUrl} alt={displayName} />
        <ChevronDownIcon className="h-5 w-5 shrink-0 text-gray-500 group-hover:text-current" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-72 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="mb-2 flex items-center space-x-2 py-4 px-4">
            <div className="shrink-0">
              <Avatar src={avatarUrl} alt={displayName} />
            </div>
            <div className="flex flex-col truncate">
              <span>{displayName}</span>
              <span className="text-sm text-gray-500">{email}</span>
            </div>
          </div>

          <Menu.Item>
            <button
              className="flex w-full items-center space-x-2 py-2 px-4 hover:bg-gray-100"
              onClick={() => null}
            >
              <LogoutIcon className="h-5 w-5 shrink-0 text-gray-500" />
              <span>Logout</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserMenu
