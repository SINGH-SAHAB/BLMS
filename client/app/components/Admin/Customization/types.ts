// types.ts
export interface Category {
    _id: string;
    title: string;
  }
  
  export interface CreateCategoriesPayload {
    type: string;
    categories: Category[];
  }
  