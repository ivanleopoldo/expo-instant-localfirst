export type TDatabase = {
  notes: TNote[];
};

export interface TNote {
  id: string;
  title: string;
  description?: string;
}
