import {
  status as GrpcStatus,
  ServiceError as GrpcException,
  Metadata,
} from '@grpc/grpc-js';
import { HttpException, HttpStatus } from '@nestjs/common';

const statusMap: Map<GrpcStatus, HttpStatus> = new Map([
  [GrpcStatus.UNKNOWN, HttpStatus.INTERNAL_SERVER_ERROR],
  [GrpcStatus.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST],
  [GrpcStatus.NOT_FOUND, HttpStatus.NOT_FOUND],
  [GrpcStatus.ALREADY_EXISTS, HttpStatus.CONFLICT],
  [GrpcStatus.PERMISSION_DENIED, HttpStatus.FORBIDDEN],
  [GrpcStatus.UNAUTHENTICATED, HttpStatus.UNAUTHORIZED],
  [GrpcStatus.RESOURCE_EXHAUSTED, HttpStatus.TOO_MANY_REQUESTS],
  [GrpcStatus.FAILED_PRECONDITION, HttpStatus.PRECONDITION_FAILED],
  [GrpcStatus.OUT_OF_RANGE, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE],
  [GrpcStatus.UNIMPLEMENTED, HttpStatus.NOT_IMPLEMENTED],
  [GrpcStatus.INTERNAL, HttpStatus.INTERNAL_SERVER_ERROR],
  [GrpcStatus.UNAVAILABLE, HttpStatus.SERVICE_UNAVAILABLE],
  [GrpcStatus.DATA_LOSS, HttpStatus.INTERNAL_SERVER_ERROR],
]);

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

function hasGrpcStatus(error: Error): error is Error & { code: GrpcStatus } {
  return 'code' in error && typeof error.code === 'number';
}

function hasDetails(error: Error): error is Error & { details: string } {
  return 'details' in error && typeof error.details === 'string';
}

function hasMetadata(error: Error): error is Error & { metadata: Metadata } {
  return 'metadata' in error && error.metadata instanceof Metadata;
}

function isGrpcException(error: unknown): error is GrpcException {
  return (
    isError(error) &&
    hasGrpcStatus(error) &&
    hasDetails(error) &&
    hasMetadata(error)
  );
}

export async function transformGrpcToHttpException(
  error: unknown,
): Promise<never> {
  if (isGrpcException(error)) {
    const status =
      statusMap.get(error.code) ?? HttpStatus.INTERNAL_SERVER_ERROR;

    throw new HttpException(error.details, status, { cause: error });
  }

  throw new HttpException(
    'Internal server error',
    HttpStatus.INTERNAL_SERVER_ERROR,
    { cause: error },
  );
}
