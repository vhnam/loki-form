import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';

import { UserRole } from '../database/schema/users';
import { PasswordResetService } from '../users/password-reset.service';
import { UsersService } from '../users/users.service';
import {
  ForgotPasswordDto,
  GetProfileDto,
  LogoutDto,
  RegisterDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from './dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private passwordResetService: PasswordResetService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private generateAccessToken(payload: any, expiresIn?: string): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn:
        expiresIn ||
        this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN') ||
        '30m',
    });
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn:
        this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN') || '1h',
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role as string,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        interfaceMode: user.interfaceMode,
        interfaceLanguage: user.interfaceLanguage,
        isActive: user.isActive,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const savedUser = await this.usersService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      password: hashedPassword,
      role: 'user',
    });

    const payload = {
      sub: savedUser.id,
      email: savedUser.email,
      role: savedUser.role as string,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        role: savedUser.role,
      },
    };
  }

  async getProfile(userId: string): Promise<GetProfileDto> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role as UserRole,
      interfaceMode: user.interfaceMode,
      interfaceLanguage: user.interfaceLanguage,
      isActive: user.isActive,
    };
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto
  ): Promise<GetProfileDto> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const updateData: Partial<typeof updateProfileDto & { password?: string }> =
      {};

    if (updateProfileDto.firstName) {
      updateData.firstName = updateProfileDto.firstName;
    }

    if (updateProfileDto.lastName) {
      updateData.lastName = updateProfileDto.lastName;
    }

    if (updateProfileDto.password) {
      updateData.password = await bcrypt.hash(updateProfileDto.password, 10);
    }

    if (updateProfileDto.interfaceMode) {
      updateData.interfaceMode = updateProfileDto.interfaceMode;
    }

    if (updateProfileDto.interfaceLanguage) {
      updateData.interfaceLanguage = updateProfileDto.interfaceLanguage;
    }

    const updatedUser = await this.usersService.update(userId, updateData);

    if (!updatedUser) {
      throw new UnauthorizedException('Failed to update profile');
    }

    return {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role as UserRole,
      interfaceMode: updatedUser.interfaceMode,
      interfaceLanguage: updatedUser.interfaceLanguage,
      isActive: updatedUser.isActive,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET') as string,
      });

      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const newPayload = {
        sub: user.id,
        email: user.email,
        role: user.role as string,
      };

      const newAccessToken = this.generateAccessToken(newPayload);
      const newRefreshToken = this.generateRefreshToken(newPayload);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, logoutDto?: LogoutDto) {
    // Log the logout event
    // Note: In a production environment, you might want to:
    // 1. Add the token to a blacklist/revocation list
    // 2. Store logout events in audit logs
    // 3. Notify other services about the logout

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // TODO: Implement audit logging
    // await this.auditLogService.create({
    //   userId: user.id,
    //   action: 'logout',
    //   details: {
    //     reason: logoutDto?.reason || 'User requested logout',
    //     timestamp: new Date().toISOString(),
    //   },
    // });

    return {
      message: 'Logged out successfully',
      details: {
        userId: user.id,
        email: user.email,
        logoutTime: new Date().toISOString(),
        reason: logoutDto?.reason || 'User requested logout',
      },
    };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Invalid old password');
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.update(userId, { password: hashedNewPassword });

    return { message: 'Password changed successfully' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // 15 minutes

    // Invalidate any existing tokens for this user
    await this.passwordResetService.invalidateUserTokens(user.id);

    // Create new reset token
    await this.passwordResetService.create({
      token: resetToken,
      userId: user.id,
      expiresAt,
      isUsed: false,
    });

    // TODO: Send email with reset token
    // await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message: 'Password reset email sent successfully',
      email: user.email,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    // Find valid reset token
    const resetTokenRecord =
      await this.passwordResetService.findValidToken(token);

    if (!resetTokenRecord) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    // Check if token is expired
    if (new Date() > resetTokenRecord.expiresAt) {
      // Mark token as used
      await this.passwordResetService.markAsUsed(resetTokenRecord.id);
      throw new NotFoundException('Reset token has expired');
    }

    // Get user
    const user = await this.usersService.findById(resetTokenRecord.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await this.usersService.update(resetTokenRecord.userId, {
      password: hashedPassword,
    });

    // Mark token as used
    await this.passwordResetService.markAsUsed(resetTokenRecord.id);

    return {
      message: 'Password reset successfully',
      email: user.email,
    };
  }

  generateRandomPassword(length: number = 12): string {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }

    return password;
  }
}
