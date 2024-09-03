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
import { abi } from './abi.js'
import { mock } from 'node:test'
import { Address } from 'viem'
import { getFarcasterUserInfo } from '../../utils/neynar'

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
  console.log(name)
  return mockArtistList.artists.find((artist) => artist.name.toLocaleLowerCase() === name.toLowerCase())
};

const getRandomQuestion = (max: number) => {
  const randomIndex = Math.floor(Math.random()*(max));
  return randomIndex;
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
        background: 'black',
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
          Welcome to NFTrivia. Let start your quiz?
        </div>
      </div>
    ),
    intents: [
      <Button
       action="/like"
       value="yes"
      >
        Yes
      </Button>,
    ],
  })
})

app.frame('/like', (c) => {
  const { inputText, status } = c
  const artist = inputText

  // const { displayName, followerCount, pfpUrl } = c.var.interactor || {}

  // console.log('diplayName', displayName)
  // console.log('followerCount', followerCount)
  return c.res({
    image: (
      <div
      style={{
        alignItems: 'center',
        background: 'black',
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
    action:'/artist',
    intents: [
      <TextInput //if we dont have the input artist on our site, move for an error frame
      placeholder="Enter your favourite artist"></TextInput>,
      <Button action='/artist'>Submit</Button>,
    ],
  })
})

app.frame('/artist', (c) => {
  const { inputText } = c

  //const artistData = findArtist{artist} || mockArtistList.artists[0]
  const artistData = findArtist(inputText as string)
  if (artistData == undefined || artistData == null) {
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: 'black',
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
            Artist not found
          </div>
        </div>
      ),
      intents: [
        <Button.Reset>Reset</Button.Reset>,
      ],
    })
  }else{
    return c.res({
    image: (
      <div
      style={{
        alignItems: 'center',
        background: 'black',
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
          Let's start the quiz!
        </div>
      </div>
    ),
    intents: [
      <Button action="/question" value={artistData.name}>Start</Button>
    ]
  })
  }
})

app.frame('/question', (c) => {
  const { buttonValue } = c
  const name = buttonValue
  let artistData = findArtist(name as string)
  if (!artistData) {
    artistData = mockArtistList.artists[0]
  }
  const randomType = getRandomQuestion(2)
  if (randomType == 0) {
    const randomQuestion = getRandomQuestion(artistData.textQuestions.length)
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: 'black',
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
            {artistData.textQuestions[randomQuestion].text}
          </div>
        </div>
      ),
      intents: [
        <TextInput placeholder="Enter your answer"></TextInput>,
        <Button action="/textAnswer" value={artistData.textQuestions[randomQuestion].correctAnswer}>Submit</Button>
      ]
    })
  }
    const randomQuestion = getRandomQuestion(artistData.choiceQuestions.length)
    const buttons = [];
    for (const option of artistData.choiceQuestions[randomQuestion].options) {
      if (option.id === artistData.choiceQuestions[randomQuestion].correctOptionId) {
        buttons.push(
          <Button action="/choiceAnswer" value="correct">{option.text}</Button>
        );
      } else {
        buttons.push(
          <Button action="/choiceAnswer" value="incorrect">{option.text}</Button>
        );
      }
    }
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: 'black',
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
            {artistData.choiceQuestions[randomQuestion].text}
          </div>
        </div>
      ),
      intents: [
        ...buttons
      ]
    })
})

app.frame('/textAnswer', (c) => {
  const { buttonValue, inputText } = c;
  const correctAnswer = buttonValue;
  const answer = inputText;
  const address = c.frameData?.address;
  if ((answer as string).toLowerCase() === (correctAnswer as string).toLowerCase()) {
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: 'black',
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
            Correct! Claim your points above.
          </div>
        </div>
      ),
      intents: [
        <Button action={`/scored/${address}/1`}>Validate attempt</Button>,
      ]
    });
  }
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
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
          Incorrect! Try again next time!
        </div>
      </div>
    ),
    intents: [
      <Button action={`/scored/${address}/0`}>Validate attempt</Button>
    ]
  });
});

app.frame('/choiceAnswer',  async(c) => {
  const { buttonValue, frameData } = c;
  const verified = await getFarcasterUserInfo(1);
  const address = verified.verifiedAddresses[0];
  if (buttonValue === 'correct') {
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: 'black',
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
            Correct! Claim your points above!
          </div>
        </div>
      ),
      intents: [
        <Button action={`/scored/${address}/1`}>Validate attempt</Button>,
      ]
    });
  }
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
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
          Incorrect! Try again next time!
        </div>
      </div>
    ),
    intents: [
      <Button action={`/scored/${address}/0`}>Validate attempt</Button>
    ]
  });
});

app.frame(
  '/scored/:address/:value',
  async (c) => {
    const value = Number(c.req.param('value'))
    const address = c.req.param('address') as `0x${string}`;

    const response = await fetch('http://localhost:3002/api/add-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userAddress: address, userScore: value })
    })

    console.log(response)
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: 'black',
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
            Come back tomorrow!
          </div>
        </div>
      ),
    })
  }
)

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
