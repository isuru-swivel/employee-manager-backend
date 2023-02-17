import { Document } from 'mongoose';

export interface Employee extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly email?: string;
  readonly number?: string;
  readonly gender?: string;
  readonly photo?: string;
}
