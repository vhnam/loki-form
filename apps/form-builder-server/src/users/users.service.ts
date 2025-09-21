import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from '../database/database.service';
import { NewUser, User, users } from '../database/schema';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(emailOrId: string): Promise<User | undefined> {
    // First try to find by email
    let result = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.email, emailOrId))
      .limit(1);

    // If not found by email, try by ID only if it looks like a UUID
    if (!result[0] && this.isValidUUID(emailOrId)) {
      result = await this.databaseService.db
        .select()
        .from(users)
        .where(eq(users.id, emailOrId))
        .limit(1);
    }

    return result[0];
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0];
  }

  async findById(id: string): Promise<User | undefined> {
    const result = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0];
  }

  async create(userData: NewUser): Promise<User> {
    const result = await this.databaseService.db
      .insert(users)
      .values(userData)
      .returning();

    return result[0];
  }

  async update(
    id: string,
    userData: Partial<NewUser>
  ): Promise<User | undefined> {
    const result = await this.databaseService.db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();

    return result[0];
  }
}
