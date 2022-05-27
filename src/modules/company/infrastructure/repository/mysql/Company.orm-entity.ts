import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Company {
  @PrimaryColumn()
  id: string

  @Column('text')
  name: string
}
