// types.ts
export interface Category {
    _id: string;
    title: string;
  }
  
  export interface CreateCategoriesPayload {
    type: string;
    categories: Category[];
  }
  
  export interface Level {
    _id: string;
    title: string;
  }
  
  export interface CreateLevelspayload {
    type: string;
    levels: Level[];
  }