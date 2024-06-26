export class GetBlogWithAuthorIdDto {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    username: string;
  };
}
