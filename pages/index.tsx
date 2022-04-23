import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useAuthenticationStatus, useUserData } from '@nhost/nextjs'
import { useSubscription, useMutation } from '@apollo/client'
import Message, { MessageProps } from '../components/Message'
import MessageSkeleton from '../components/MessageSkeleton'
import Form from '../components/Form'
import UserMenu from '../components/UserMenu'
import Login from '../components/Login'
import Spinner from '../components/Spinner'

import logo from '../public/logo.svg'

import {
  GET_MESSAGES,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  UPDATE_MESSAGE,
} from '../lib/queries'

const Home: NextPage = () => {
  const { isLoading: isLoadingUser, isAuthenticated } =
    useAuthenticationStatus()
  const user = useUserData()

  const {
    loading: isLoadingMessages,
    error,
    data,
  } = useSubscription(GET_MESSAGES, {
    skip: isLoadingUser || !isAuthenticated,
  })
  let messages = data?.messages ?? []

  const [createMessage] = useMutation(CREATE_MESSAGE)
  const [deleteMessage] = useMutation(DELETE_MESSAGE)
  const [updateMessage] = useMutation(UPDATE_MESSAGE)

  const createMessageHandler = (text: string) => {
    if (!user) return

    return createMessage({
      variables: {
        object: {
          text,
          authorId: user.id,
        },
      },
    })
  }

  const deleteMessageHandler = (id: string) => {
    if (!id) return

    return deleteMessage({
      variables: {
        id,
      },
    })
  }

  const updateMessageHandler = (id: string, text: string) => {
    if (!id || !text) return

    return updateMessage({
      variables: {
        id,
        text,
      },
    })
  }

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
            {isAuthenticated && user ? <UserMenu {...user} /> : null}
          </div>
        </header>

        <main className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
          {isLoadingUser ? (
            <Spinner />
          ) : !isAuthenticated ? (
            <Login />
          ) : (
            <>
              <div className="w-full flex-1 overflow-y-auto px-4">
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
                          <Message
                            {...msg}
                            onDelete={deleteMessageHandler}
                            onEdit={updateMessageHandler}
                          />
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

              <div className="mx-auto mb-6 w-full max-w-screen-md flex-shrink-0 px-4">
                <Form onSubmit={createMessageHandler} />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default Home
