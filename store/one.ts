import { create } from 'zustand';

export interface TypeOne {
  id: string | null;
  name: string | null;
  photo: string | null;
}

export interface TypeOneStore extends TypeOne {
  change: (auth: TypeOne) => void;
}

export const useOneStore = create<TypeOneStore>((set) => ({
  id: null,
  name: null,
  photo: null,

  change: ({ id, name, photo }) => set(() => ({ id, name, photo })),
}));
