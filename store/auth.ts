import { create } from 'zustand';

export type TypeStatus = 'loading' | 'failed' | 'fetched';

export const status = {
  loading: 'loading',
  failed: 'failed',
  fetched: 'fetched',
};

export interface TypeAuth {
  status: TypeStatus;
  id: string | null;
  name: string | null;
  photo: string | null;
}

export interface TypeAuthStore extends TypeAuth {
  changeAll: (auth: TypeAuth) => void;
  changeName: (name: string) => void;
  changePhoto: (photo: string) => void;
}

export const useAuthStore = create<TypeAuthStore>((set) => ({
  status: 'loading',
  id: null,
  name: null,
  photo: null,

  changeAll: ({ status, id, name, photo }) => set(() => ({ status, id, name, photo })),
  changeName: (name) => set(() => ({ name })),
  changePhoto: (photo) => set(() => ({ photo })),
}));
