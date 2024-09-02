import { ArtistList } from '../types/types';

export const mockArtistList: ArtistList = {
  artists: [
    {
        id: 1,
        name: 'Nome do Artista',
        biography: 'Breve biografia do artista.',
        choiceQuestions: [
            {
                id: 1,
                text: 'Qual foi o primeiro álbum lançado pelo artista?',
                options: [
                { id: 1, text: 'Álbum A' },
                { id: 2, text: 'Álbum B' },
                { id: 3, text: 'Álbum C' },
                ],
                correctOptionId: 1,
            },
            {
                id: 2,
                text: 'Qual é o estilo musical predominante do artista?',
                options: [
                { id: 1, text: 'Rock' },
                { id: 2, text: 'Pop' },
                { id: 3, text: 'Jazz' },
                ],
                correctOptionId: 2,
            }
        ],
        textQuestions: [
            {
                id: 1,
                text: 'Qual é o nome do primeiro álbum lançado pelo artista?',
                correctAnswer: 'Álbum A',
            },
            {
                id: 2,
                text: 'Qual é o estilo musical predominante do artista?',
                correctAnswer: 'Pop',
            }
        ]
    },
    {
        id: 2,
        name: 'Nome do Artista 2',
        biography: 'Breve biografia do artista 2.',
        choiceQuestions: [
            {
                id: 1,
                text: 'Qual foi o primeiro álbum lançado pelo artista 2?',
                options: [
                { id: 1, text: 'Álbum A' },
                { id: 2, text: 'Álbum B' },
                { id: 3, text: 'Álbum C' },
                ],
                correctOptionId: 2,
            },
            {
                id: 2,
                text: 'Qual é o estilo musical predominante do artista 2?',
                options: [
                { id: 1, text: 'Rock' },
                { id: 2, text: 'Pop' },
                { id: 3, text: 'Jazz' },
                ],
                correctOptionId: 1,
            }
        ],
        textQuestions: [
            {
                id: 1,
                text: 'Qual é o nome do primeiro álbum lançado pelo artista 2?',
                correctAnswer: 'Álbum B',
            },
            {
                id: 2,
                text: 'Qual é o estilo musical predominante do artista 2?',
                correctAnswer: 'Rock',
            }
        ]
    },
    {
        id: 3,
        name: 'a',
        biography: 'Breve biografia do artista 3.',
        choiceQuestions: [
            {
                id: 1,
                text: 'Qual foi o primeiro álbum lançado pelo artista 3?',
                options: [
                { id: 1, text: 'Álbum A' },
                { id: 2, text: 'Álbum B' },
                { id: 3, text: 'Álbum C' },
                ],
                correctOptionId: 3,
            },
            {
                id: 2,
                text: 'Qual é o estilo musical predominante do artista 3?',
                options: [
                { id: 1, text: 'Rock' },
                { id: 2, text: 'Pop' },
                { id: 3, text: 'Jazz' },
                ],
                correctOptionId: 3,
            }
        ],
        textQuestions: [
            {
                id: 1,
                text: 'Qual é o nome do primeiro álbum lançado pelo artista 3?',
                correctAnswer: 'Álbum C',
            },
            {
                id: 2,
                text: 'Qual é o estilo musical predominante do artista 3?',
                correctAnswer: 'Jazz',
            }
        ]
    },
    ],
}