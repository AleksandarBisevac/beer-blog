export interface PostDetails {
  createdAt: string;
  tags: string[];
  title: string;
  slug: string;
  meta: string;
  thumbnail?: string;
}

export interface IncomingPost {
  title: string;
  meta: string;
  slug: string;
  content: string;
  tags?: string;
  thumbnail?: string;
}
