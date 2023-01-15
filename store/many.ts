import { create } from 'zustand';

interface Person {
  name: string;
  photo: string;
}
interface People {
  [key: string]: Person;
}
export interface Message {
  id: string;
  author: string;
  content: string;
}
export interface ManyStore {
  isLoading: boolean;
  isError: boolean;
  id: string;
  title: string;
  allPeople: People;
  curPeople: People;
  messages: Message[];
  setIsLoading: (state: boolean) => void;
  setIsError: (state: boolean) => void;
  setId: (id: string) => void;
  setTitle: (title: string) => void;
  setAllPeople: (people: People) => void;
  setCurPeople: (people: People) => void;
  setMessages: (messages: Message[]) => void;
}

export const useManyStore = create<ManyStore>((set) => ({
  isLoading: true,
  isError: false,
  id: '',
  title: '',
  allPeople: {},
  curPeople: {},
  messages: [],

  setIsLoading: (state: boolean) =>
    set(() => {
      return { isLoading: state };
    }),

  setIsError: (state: boolean) =>
    set(() => {
      return { isError: state };
    }),

  setId: (id: string) =>
    set(() => {
      return { id };
    }),

  setTitle: (title: string) =>
    set(() => {
      return { title };
    }),

  setAllPeople: (people: People) =>
    set(() => {
      return { allPeople: people };
    }),

  setCurPeople: (people: People) =>
    set(() => {
      return { curPeople: people };
    }),

  setMessages: (messages: Message[]) =>
    set(() => {
      return { messages };
    }),
}));
