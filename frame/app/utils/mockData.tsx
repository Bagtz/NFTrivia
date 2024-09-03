import { ArtistList } from '../types/types';

export const mockArtistList: ArtistList = {
  artists: [
    {
        id: 1,
        name: 'Alok',
        choiceQuestions: [
            {
                id: 1,
                text: 'Where is Alok from?',
                options: [
                { id: 1, text: 'Cansas - United States' },
                { id: 2, text: 'Rio de Janeiro - Brazil' },
                { id: 3, text: 'Goiás - Brazil' },
                ],
                correctOptionId: 3
            },
            {
                id: 2,
                text: 'What is Alok\'s predominant musical style?',
                options: [
                { id: 1, text: 'Eletronic' },
                { id: 2, text: 'Zumba' },
                { id: 3, text: 'Rock' },
                ],
                correctOptionId: 1,
            }
        ],
        textQuestions: [
            {
                id: 1,
                text: 'What is Alok\s first name?',
                correctAnswer: 'Alok',
            },
            {
                id: 2,
                text: 'How many childs Alok has?',
                correctAnswer: '1',
            }
        ]
    },
    {
        id: 2,
        name: 'Taylor SWift',
        choiceQuestions: [
            {
                id: 1,
                text: 'How old is Taylor Swift?',
                options: [
                { id: 1, text: '29' },
                { id: 2, text: '34' },
                { id: 3, text: '32' },
                ],
                correctOptionId: 2,
            },
            {
                id: 2,
                text: 'What is Taylor Swift most famous music?',
                options: [
                { id: 1, text: 'I don\t Wanna Live Forever' },
                { id: 2, text: 'Shake it Off' },
                { id: 3, text: 'Style' },
                ],
                correctOptionId: 1,
            }
        ],
        textQuestions: [
            {
                id: 1,
                text: 'What is Taylor Swift first album name?',
                correctAnswer: 'Taylor Swift',
            },
            {
                id: 2,
                text: 'What is Taylor Swift music style?',
                correctAnswer: 'Pop',
            }
        ]
    },
    ],
}
