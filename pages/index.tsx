import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useAuthenticationStatus, useUserData } from '@nhost/nextjs'
import { useQuery } from '@apollo/client'
import Message, { MessageProps } from '../components/Message'
import MessageSkeleton from '../components/MessageSkeleton'
import Form from '../components/Form'
import Avatar from '../components/Avatar'
import Login from '../components/Login'
import Spinner from '../components/Spinner'

import logo from '../public/logo.svg'

import { GET_MESSAGES } from '../lib/queries'

const Home: NextPage = () => {
  const { isLoading: isLoadingUser, isAuthenticated } =
    useAuthenticationStatus()
  const user = useUserData()

  const {
    loading: isLoadingMessages,
    error,
    data,
  } = useQuery(GET_MESSAGES, {
    skip: isLoadingUser || !isAuthenticated,
  })

  const messages = data?.messages ?? []

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
            {isAuthenticated && user ? (
              <Avatar src={user.avatarUrl} alt={user.displayName} />
            ) : null}
          </div>
        </header>

        <main className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
          {isLoadingUser ? (
            <Spinner />
          ) : !isAuthenticated ? (
            <Login />
          ) : (
            <>
              <div className="w-full flex-1 overflow-y-auto">
                <div className="mx-auto max-w-screen-md">
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

                  {isLoadingMessages ? (
                    <div className="my-6 space-y-4">
                      {[...new Array(5)].map((_, i) => (
                        <MessageSkeleton key={i} />
                      ))}
                    </div>
                  ) : error ? (
                    <p className="my-6 text-center text-red-500">
                      Something went wrong. Try to refresh the page.
                    </p>
                  ) : messages.length > 0 ? (
                    <ol className="my-6 space-y-4">
                      {messages.map((msg: MessageProps) => (
                        <li key={msg.id}>
                          <Message {...msg} />
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="my-6 text-center text-gray-500">
                      No messages yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="mx-auto mb-6 w-full max-w-screen-md flex-shrink-0">
                <Form />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default Home
