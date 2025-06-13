import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(type?: string, message?: string, description = 'Custom Unauthorized Exception') {
    super(
      HttpException.createBody(UnauthorizedException.createResponse(type, message), description, HttpStatus.UNAUTHORIZED),
      HttpStatus.UNAUTHORIZED,
    );

    if (typeof type == 'string') {
      this.name = type;
    }
    if (typeof message == 'string') {
      this.message = message;
    }
  }
  static createResponse(type?: string, message?: string): string | object | any {
    return {
      type: type,
      description: message,
    };
  }
}
