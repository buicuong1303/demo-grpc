import { HeroById } from "@demo-grpc/service-b/hero/feature";
import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";
export interface Hero {
  id: number;
  name: string;
}
export enum ServingStatus {
  UNKNOWN = 0,
  SERVING = 1,
  NOT_SERVING = 2
}
export interface HealthCheckRequest {
  service: string;
}
export interface HealthCheckResponse {
  status: ServingStatus;
};
export interface IHealthGrpcClient {
  check(
    request: HealthCheckRequest,
    metadata?: Metadata,
    ...rest: any
  ): Observable<HealthCheckResponse>;
  findMany(upstream: Observable<HeroById>): Observable<Hero>;
}
export interface IHealthGrpcController {
  check(
    request: HealthCheckRequest,
    metadata?: Metadata,
    ...rest: any
  ): Observable<HealthCheckResponse> | Promise<HealthCheckResponse> | HealthCheckResponse;
  findMany(upstream: Observable<HeroById>): Observable<Hero>;
}