/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { pinata } from 'frog/hubs'
import { neynar } from 'frog/middlewares'
import { getDisplayName } from 'next/dist/shared/lib/utils'
import { mockArtistList } from '@/app/utils/mockData'

const app = new Frog({
  // browserLocation: '/',
  assetsPath: '/',
  basePath: '/api',
  title: 'ArtistQuiz',
  hub: pinata(),
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  }),
)

const findArtist = (name: string) => {
  return mockArtistList.artists.find((artist) => artist.name === name)
};

app.frame('/', (c) => {
  const { inputText, status } = c
  const buttonValue = c.buttonValue
  const started = buttonValue

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Let's start?
        </div>
      </div>
    ),
    intents: [
      <Button
       action="/like"
       value="yes"
      >
        yes
      </Button>,
      <Button
       action="/like"
       value="no"
      >
        no
      </Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/like', (c) => {
  const { buttonValue, inputText, status, frameData, verified } = c
  const artist = inputText || buttonValue

  console.log('verified', verified)
  console.log('frameData', frameData)

  const { fid } = frameData || {}

  const { displayName, pfpUrl } = c.var.interactor || {}

  // const { displayName, followerCount, pfpUrl } = c.var.interactor || {}

  // console.log('diplayName', displayName)
  // console.log('followerCount', followerCount)
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
           {status === 'response'
            ? `Choose your favourite artist?` 
            : ''} 
        </div>
      </div>
    ),
    intents: [
      <TextInput //if we dont have the input artist on our site, move for an error frame
      placeholder="Enter your favourite artist"></TextInput>,
    ],
  })
})

app.frame('/yes', (c) => {
  return c.res({
    image: 'https://i.ytimg.com/vi/R3UACX5eULI/maxresdefault.jpg',
    intents: [
      <Button value="eduardo" action="/neynar">Neynar</Button>
    ]
  })
})

app.frame('/neynar', (c) => {
const { displayName, followerCount, pfpUrl } = c.var.interactor || {} 
console.log('cast: ', c.var.cast)
console.log('interactor: ', c.var.interactor)
return c.res({
image: (
<div
style={{
  alignItems: 'center',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  fontSize: 48,
  height: '100%',
  width: '100%',
}}
>
Greetings {displayName}, you have {followerCount} followers.
{/* <img
 style={{
  width: 200,
  height: 200,
 }}
 src={pfpUrl}
 /> */}
</div>
),
})
})

app.frame('/no', (c) => {
  return c.res({
    image: (
      <div style={{color: 'black', display: 'flex', fontSize:60 }}>
        perform a transaction
      </div>
    ),
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target='Value'>Mint</Button.Transaction>,
    ]
  })
})

// app.transaction('/send-ether', (c) => {
//   const { address } = c
//   const { initialPath } = c
//   const { inputText } = c
//   return c.send({/* */})
// })

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
