import { Course } from '@prisma/client';

export class CourseEntity implements Course {
  id: string;
  name: string;
  description: string | null;
  subject: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}
