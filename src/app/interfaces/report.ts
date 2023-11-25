export interface Report {
    id: string;
    summary: string;
    description: string;
    comment: string;
    image: {
      path: string;
      added: string;
    };
}
  