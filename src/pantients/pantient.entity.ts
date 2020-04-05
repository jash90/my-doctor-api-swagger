import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    HasMany,
    Length,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import { Visit } from '../visits/visit.entity';

@Table({
    tableName: 'pantient',
})
export class Pantient extends Model<Pantient> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column({ field: 'first_name' })
    firstname: string;

    @Column({ field: 'last_name' })
    lastname: string;

    @Length({
        min: 6, max: 6,
        msg: `The length of postcode must be 6.`,
    })
    @Column
    postcode: string;

    @Column
    street: string;

    @Column
    city: string;

    @Length({
        min: 9, max: 9,
        msg: `The length of phone must be 6.`,
    })
    @Column
    phone: string;

    @Length({
        min: 11, max: 11,
        msg: `The length of pesel must be 11.`,
    })
    @Unique
    @Column
    pesel: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;

    @HasMany(() => Visit)
    visits: Visit[];
}
