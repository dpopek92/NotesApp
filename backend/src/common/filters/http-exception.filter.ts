import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const path = request.url;
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse() as object;
    const timestamp = new Date().toISOString();

    const responseBody = {
      ...exceptionResponse,
      timestamp,
      path,
    };

    this.logger.error(responseBody);

    response.status(statusCode).json(responseBody);
  }
}
