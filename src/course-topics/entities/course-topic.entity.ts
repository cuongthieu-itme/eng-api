import { CourseTopic } from '@prisma/client';

export class CourseTopicEntity implements CourseTopic {
  id: string;
  courseId: string;
  topic: string;
}
