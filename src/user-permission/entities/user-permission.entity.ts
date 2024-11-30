import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
