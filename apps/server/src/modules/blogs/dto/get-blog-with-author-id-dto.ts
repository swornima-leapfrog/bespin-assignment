export class GetBlogWithAuthorIdDto {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: {
    id: number;
    username: string;
  };
}
