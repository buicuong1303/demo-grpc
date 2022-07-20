import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";

export interface HeroById {
  id: number;
}
export interface HeroResponse {
  id: number;
  name: string;
}
export interface ServiceBClient {
  getHero(
    request: HeroById,
    metadata?: Metadata,
    ...rest: any
  ): Observable<HeroResponse>
}