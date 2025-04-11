import Joi from "joi";

export const validateCreateAssignment = Joi.object({
  title: Joi.string().required(),
  course: Joi.string().required(),
  dueDate: Joi.string().required(),
  status: Joi.string().valid("published", "draft").required(),
  points: Joi.number().required(),
  description: Joi.string().min(5).required(),
  publishImmediately: Joi.boolean().required(),
});

export const validateCreateQuiz = Joi.object({
  title: Joi.string().required(),
  subject: Joi.string().required(),
  userClass: Joi.string().required(),
  courseId: Joi.string().required(),
  duration: Joi.string().required(),
  showResults: Joi.boolean().required(),
  retake: Joi.boolean().required(),
  randomize: Joi.boolean().required(),
  linear: Joi.boolean().required(),
  quizStartTime: Joi.string().required(),
  quizDeadline: Joi.string().required(),
  numberOfQuestions: Joi.string().required(),
  // FIXME: Will come back --K
});
