import {
  BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, })
  public username: string;

  @Column({ unique: true, })
  public email: string;

  @Column()
  public password: string;

  // 생성일자와 수정일자를 만들어준다.
  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
