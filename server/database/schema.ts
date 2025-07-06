export interface IngredientsTable {
  id: number;
  name: string;
  amount: number;
  unit: string;
  created_at: string;
}

export interface DatabaseSchema {
  ingredients: IngredientsTable;
}
