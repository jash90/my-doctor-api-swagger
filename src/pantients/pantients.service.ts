import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePantientDto } from './dto/create-pantient.dto';
import { Pantient } from './pantient.entity';
import { PantientDto } from './dto/pantient.dto';
import { UpdatePantientDto } from './dto/update-pantient.dto';
import { PantientOffset } from './dto/pantient.offset';
import { Visit } from '../visits/visit.entity';

@Injectable()
export class PantientsService {
    constructor(
        @Inject('PantientsRepository')
        private readonly pantientsRepository: typeof Pantient,
    ) { }

    async findAll(): Promise<PantientDto[]> {
        const pantients = await this.pantientsRepository.findAll<Pantient>({
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        return pantients.map(pantient => {
            return new PantientDto(pantient);
        });
    }

    async findOne(id: number): Promise<PantientDto> {
        const pantient = await this.pantientsRepository.findByPk<Pantient>(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        if (!pantient) {
            throw new HttpException('No pantient found', HttpStatus.NOT_FOUND);
        }

        return new PantientDto(pantient);
    }

    async create(createPantientDto: CreatePantientDto): Promise<Pantient> {
        const pantient = new Pantient();
        pantient.firstName = createPantientDto.firstName;
        pantient.lastName = createPantientDto.lastName;
        pantient.postcode = createPantientDto.postcode;
        pantient.street = createPantientDto.street;
        pantient.city = createPantientDto.city;
        pantient.phone = createPantientDto.phone;
        pantient.pesel = createPantientDto.pesel;

        try {
            return await pantient.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getPantient(id: number): Promise<Pantient> {
        const pantient = await this.pantientsRepository.findByPk<Pantient>(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        if (!pantient) {
            throw new HttpException('No pantient found', HttpStatus.NOT_FOUND);
        }

        return pantient;
    }

    async update(
        id: number,
        updatePantientDto: UpdatePantientDto,
    ): Promise<Pantient> {
        const pantient = await this.getPantient(id);

        pantient.firstName = updatePantientDto.firstName || pantient.firstName;
        pantient.lastName = updatePantientDto.lastName || pantient.lastName;
        pantient.postcode = updatePantientDto.postcode || pantient.postcode;
        pantient.street = updatePantientDto.street || pantient.street;
        pantient.city = updatePantientDto.city || pantient.city;
        pantient.phone = updatePantientDto.phone || pantient.phone;
        pantient.pesel = updatePantientDto.pesel || pantient.pesel;
        try {
            return await pantient.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Pantient> {
        const pantient = await this.getPantient(id);
        await pantient.destroy();
        return pantient;
    }

    async offset(index: number = 0): Promise<PantientOffset> {
        let pantients = await this.pantientsRepository.findAndCountAll({
            include: [Visit],
            limit: 100,
            offset: index * 100,
            order: ['id'],
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });

        let PantientDto = pantients.rows.map(pantient => {
            return new PantientDto(pantient);
        })

        return { rows: PantientDto, count: pantients.count };
    }
}
