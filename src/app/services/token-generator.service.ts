import { Injectable } from '@angular/core';
import { MD5 } from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class TokenGeneratorService {

  constructor() { }

  public generateAuthToken(email: string): string {
    return MD5(email.trim().toLowerCase()).toString();
  }
}
