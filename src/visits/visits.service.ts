import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit } from './visit.entity';
import { VisitDto } from './dto/visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitsService {
    constructor(
        @Inject('VisitsRepository')
        private readonly visitsRepository: typeof Visit,
    ) { }

    async findAll(): Promise<VisitDto[]> {
        const visits = await this.visitsRepository.findAll<Visit>({
        });
        return visits.map(visit => {
            return new VisitDto(visit);
        });
    }

    async findOne(id: number): Promise<VisitDto> {
        const visit = await this.visitsRepository.findByPk<Visit>(id, {
        });
        if (!visit) {
            throw new HttpException('No visit found', HttpStatus.NOT_FOUND);
        }

        return new VisitDto(visit);
    }

    async create(createVisitDto: CreateVisitDto): Promise<Visit> {
        const visit = new Visit();
        visit.doctorId = createVisitDto.doctorId;
        visit.pantientId = createVisitDto.pantientId;
        visit.date = createVisitDto.date;
        visit.description = createVisitDto.description;

        try {
            return await visit.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getVisit(id: number): Promise<Visit> {
        const visit = await this.visitsRepository.findByPk<Visit>(id);
        if (!visit) {
            throw new HttpException('No visit found', HttpStatus.NOT_FOUND);
        }

        return visit;
    }

    async update(
        id: number,
        updateVisitDto: UpdateVisitDto,
    ): Promise<Visit> {
        const visit = await this.getVisit(id);
        visit.doctorId = updateVisitDto.doctorId || visit.doctorId;
        visit.pantientId = updateVisitDto.pantientId || visit.pantientId;
        visit.date = updateVisitDto.date || visit.date;
        visit.description = updateVisitDto.description || visit.description;

        try {
            return await visit.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Visit> {
        const visit = await this.getVisit(id);
        await visit.destroy();
        return visit;
    }
}
