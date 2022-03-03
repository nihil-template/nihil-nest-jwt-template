import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '@/entities/entity.entity';

@Entity('users')
export class User extends DefaultEntity {
  @Column({ unique: true, })
  public username: string;

  @Column({ unique: true, })
  public email: string;

  @Column()
  public password: string;
}
