import Image from 'next/image'

import logo from '../public/logo.svg'
import githubLogo from '../public/github.svg'

const Login = () => {
  // TODO: Implement Google+Github authentication

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center border-opacity-50 px-4 py-8 sm:rounded-xl sm:border sm:px-8 sm:shadow-md">
        <Image src={logo} alt="logo" />
        <p className="mt-4 text-center">Please sign in to access the chat</p>
        <div className="mt-8 space-y-4">
          <a
            href="#"
            className="flex items-center justify-center space-x-2 rounded-md border border-opacity-50 px-6 py-2 hover:bg-gray-50"
          >
            <Image src={githubLogo} alt="Github" width={32} height={32} />
            <span>Sign in with Github</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
