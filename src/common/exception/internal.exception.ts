import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorTypeEnum } from '@src/common/exception/error.enum';

export class InternalException extends HttpException {
  shouldSentryCapture = true;

  constructor(type?: ErrorTypeEnum, message?: string, description = 'Custom Internal Exception') {
    super(HttpException.createBody(InternalException.createResponse(type, message), description, HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST);

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
