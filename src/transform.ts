import { Comment, Discussion } from '../models/entities';

export const processComments = (
  comments: Comment[],
  callback?: (comments: Comment[]) => void,
) => {
  comments.forEach((comment) => {
    console.log(comment.id);
    comment.replies.comments.forEach((reply) =>
      processComments(reply.replies.comments),
    );
  });
};

export const transformContent = async (discussion: Discussion) => {
  console.log({ discussion });
};

export const transformUsers = async (discussion: Discussion) => {
  processComments(discussion.comments.comments);
};
