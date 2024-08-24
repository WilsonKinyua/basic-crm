import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpRequestExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // Handle HttpException
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const errorResponse = exception.getResponse();
            const errorMessage = typeof errorResponse === 'string' ? errorResponse : (errorResponse as any).message;            
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: errorMessage || 'An error occurred',
                error: exception.name,
            });
        }
        // Handle QueryFailedError
        else if (exception instanceof QueryFailedError) {
            response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'A database error occurred while processing your request.',
                error: exception.name,
            });
        }
        // Handle other exceptions
        else {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'An unexpected error occurred. Please try again later.',
                error: exception.name,
            });
        }
    }
}