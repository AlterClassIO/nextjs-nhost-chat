import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Message from '../components/Message'
import Form from '../components/Form'
import Avatar from '../components/Avatar'

import logo from '../public/logo.svg'

const messages = [
  {
    id: '001',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
  {
    id: '002',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
  {
    id: '003',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
  {
    id: '004',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
  {
    id: '005',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
  {
    id: '006',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
  {
    id: '007',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
  {
    id: '008',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
  {
    id: '009',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
  {
    id: '011',
    createdAt: '2022-04-11T16:59:02.243392+00:00',
    user: {
      displayName: 'Elon Musk',
      avatarUrl: '',
    },
    text: 'Hello, World!',
  },
]

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nhost Chat - AlterClass</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <header className="h-14 bg-white shadow">
          <div className="container mx-auto flex h-full items-center justify-between px-4">
            <Image src={logo} />
            <Avatar src="" alt="Current user" />
          </div>
        </header>

        <main className="flex max-h-[calc(100vh-3.5rem)] flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-screen-md">
              <div className="mt-12 border-b pb-6 text-center">
                <h1 className="text-3xl font-extrabold">
                  Welcome to
                  <br />
                  Nhost Chat
                </h1>
                <p className="mt-3 text-gray-500">
                  This is the beginning of this chat.
                </p>
              </div>

              <ol className="my-6 space-y-4">
                {messages.map((msg) => (
                  <li key={msg.id}>
                    <Message {...msg} />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mx-auto mb-6 w-full max-w-screen-md flex-shrink-0">
            <Form />
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
