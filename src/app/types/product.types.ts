export interface ProductSchema {
    id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    [key: string]: any;
  }

  export interface ProductGetOptionsSchema {
    limit ?: number,
    sortBy?: string;
  filterBy?: string;
  pageNumber?: number;
  }
  