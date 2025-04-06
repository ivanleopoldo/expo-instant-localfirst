import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { TNote } from '../types';
import createSelectors from './createSelectors';

export type NoteState = {
  note: TNote;
};

export type NoteActions = { setNote: (note: TNote) => void };

const useNoteStoreBase = create<NoteState & NoteActions>()(
  immer((set) => ({
    note: { id: '0', title: '' },
    setNote: (note: TNote) => set((state) => (state.note = note)),
  }))
);

export const useNoteStore = createSelectors(useNoteStoreBase);
