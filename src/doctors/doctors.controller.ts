import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiImplicitParam, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorsService } from './doctors.service';
import { AuthGuard } from '@nestjs/passport';
import { Doctor as DoctorEntity } from './doctor.entity';
import { DoctorDto } from './dto/doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorOffset } from './dto/doctor.offset';
import { VisitDto } from '../visits/dto/visit.dto';

@Controller('doctors')
@ApiUseTags('doctors')
export class DoctorsController {
    constructor(private readonly doctorsService: DoctorsService) { }

    @Get()
    @ApiOkResponse({ type: [DoctorDto] })
    findAll(): Promise<DoctorDto[]> {
        return this.doctorsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: DoctorDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<DoctorDto> {
        return this.doctorsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: DoctorEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createDoctorDto: CreateDoctorDto,
    ): Promise<DoctorEntity> {
        return this.doctorsService.create(createDoctorDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: DoctorEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateDoctorDto: UpdateDoctorDto,
    ): Promise<DoctorEntity> {
        return this.doctorsService.update(id, updateDoctorDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: DoctorEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<DoctorEntity> {
        return this.doctorsService.delete(id);
    }

    @Get('offset/:id')
    @ApiOkResponse({ type: DoctorOffset })
    offset(@Param('id', new ParseIntPipe()) index: number = 0): Promise<DoctorOffset> {
        return this.doctorsService.offset(index);
    }

    @Get(':doctorId/visits')
    @ApiOkResponse({ type: [VisitDto] })
    @ApiImplicitParam({ name: 'doctorId', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    pantientVisits(
        @Param('doctorId', new ParseIntPipe()) id: number,
    ): Promise<VisitDto[]> {
        return this.doctorsService.doctorVisits(id);
    }
}
