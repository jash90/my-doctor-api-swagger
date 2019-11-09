import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { Doctor } from '../doctors/doctor.entity';
import { Pantient } from '../pantients/pantient.entity';

@Table({
    tableName: 'visit',
})
export class Visit extends Model<Visit> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @ForeignKey(() => Doctor)
    @Column({ type: DataType.BIGINT, field: 'doctor_id' })
    doctorId: number;

    @ForeignKey(() => Pantient)
    @Column({ type: DataType.BIGINT, field: 'pantient_id' })
    pantientId: number;

    @Column(DataType.DATE)
    date: Date;

    @Column(DataType.STRING)
    description: string;

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

    @BelongsTo(() => Pantient)
    pantient: Pantient;
}
