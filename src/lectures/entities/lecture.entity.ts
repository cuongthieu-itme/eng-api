import { Lecture, LectureStatus } from '@prisma/client';

export class LectureEntity implements Lecture {
  id: string;
  courseId: string;
  createdById: string;
  title: string;
  content: string;
  outline: string;
  pptxUrl: string | null;
  mindmapUrl: string | null;
  status: LectureStatus;
  createdAt: Date;
  updatedAt: Date;
}
