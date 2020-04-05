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
import { Specialist } from '../shared/enum/enums';
import { Schedule } from '../schedules/schedule.entity';
import { Visit } from '../visits/visit.entity';

@Table({
    tableName: 'doctor',
})
export class Doctor extends Model<Doctor> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Length({
        min: 7, max: 7,
        msg: `The length of comment must be 7.`,
    })
    @Unique
    @Column
    numberPwz: string;

    @Column({ field: 'first_name' })
    firstname: string;

    @Column({ field: 'last_name' })
    lastname: string;

    @Column({
        type: DataType.ENUM(
            ['chirurg_ogólny', 'okulista', 'dermatolog', 'laryngolog', 'ginekolog', 'kardiolog', 'urolog', 'ortopeda', 'pulmonolog',
                'neurolog', 'alergolog', 'gastrolog', 'diabetolog', 'endokrynolog', 'reumatolog', 'nefrolog', 'hematolog', 'onkolog']),
    })
    specialization: Specialist;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;

    @HasMany(() => Schedule)
    schedules: Schedule[];

    @HasMany(() => Visit)
    visits: Visit[];
}
