export type Feedback = {
  rating: number;
  comment: string;
  author: string;
  date: Date;
};

export type ArtTool = {
  id: string;
  artName: string;
  price: number;
  description: string;
  glassSurface: boolean;
  image: string;
  brand: string;
  limitedTimeDeal: number;
  feedbacks: Feedback[];
};
