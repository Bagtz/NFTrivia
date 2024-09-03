export interface Option {
    id: number;
    text: string;
  }
  
  export interface ChoiceQuestion {
    id: number;
    text: string;
    options: Option[];
    correctOptionId: number;
  }
  
  export interface TextQuestion {
    id: number;
    text: string;
    correctAnswer: string;
  }

  export interface Artist {
    id: number;
    name: string;
    choiceQuestions: ChoiceQuestion[];
    textQuestions: TextQuestion[];
  }

  export interface ArtistList {
    artists: Artist[];
  }
  
