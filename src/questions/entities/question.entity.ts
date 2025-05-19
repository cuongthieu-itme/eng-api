import { Question } from '@prisma/client';

export class QuestionEntity implements Question {
  id: string;
  lectureId: string;
  createdById: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string | null;
  createdAt: Date;
  updatedAt: Date;
}
