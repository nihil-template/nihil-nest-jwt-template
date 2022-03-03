import {
  BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

export class DefaultEntity extends BaseEntity {
  // 자동으로 고유한 아이디 값을 만들어준다.
  @PrimaryGeneratedColumn()
  public id: number;

  // 생성일자와 수정일자를 만들어준다.
  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
