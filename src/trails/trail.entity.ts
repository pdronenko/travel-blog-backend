import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from '../auth/user.entity';

@Entity()
export class Trail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  headline: string;

  @Column()
  pretext: string;

  @ManyToOne(type => User, user => user.trails, { eager: false })
  user: User;

  @Column()
  userId: number;
}
