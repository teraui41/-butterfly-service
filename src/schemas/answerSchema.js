export const answerSchema = {
  uuid: {
    type: "string",
    primary: true,
  },
  bedNo: {
    type: "string",
  },
  language: {
    type: "string",
  },
  answers: {
    type: "array",
  },
  createTime: {
    type: "date-time",
  },
};
