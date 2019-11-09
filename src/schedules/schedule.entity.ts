import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    Max,
    Min,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { Doctor } from '../doctors/doctor.entity';

@Table({
    tableName: 'schedule',
})
export class Schedule extends Model<Schedule> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @ForeignKey(() => Doctor)
    @Column({ type: DataType.BIGINT, field: 'doctor_id' })
    doctorId: number;

    @Min(1)
    @Max(7)
    @Column
    dayOfWeek: number;

    @Column(DataType.TIME)
    hourOpen: string;

    @Column(DataType.TIME)
    hourClose: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;

    @BelongsTo(() => Doctor)
    doctor: Doctor;
}
