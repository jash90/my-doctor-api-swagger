import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiImplicitParam, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitsService } from './visits.service';
import { AuthGuard } from '@nestjs/passport';
import { Visit as VisitEntity } from './visit.entity';
import { VisitDto } from './dto/visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitOffset } from './dto/visit.offset';

@Controller('visits')
@ApiUseTags('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) { }

    @Get()
    @ApiOkResponse({ type: [VisitDto] })
    findAll(): Promise<VisitDto[]> {
        return this.visitsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: VisitDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<VisitDto> {
        return this.visitsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: VisitEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createVisitDto: CreateVisitDto,
    ): Promise<VisitEntity> {
        return this.visitsService.create(createVisitDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: VisitEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateVisitDto: UpdateVisitDto,
    ): Promise<VisitEntity> {
        return this.visitsService.update(id, updateVisitDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: VisitEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<VisitEntity> {
        return this.visitsService.delete(id);
    }

    @Get('offset/:id')
    @ApiOkResponse({ type: VisitOffset })
    offset(@Param('id', new ParseIntPipe()) index: number = 0): Promise<VisitOffset> {
        return this.visitsService.offset(index);
    }

    @Get('freeVisit/:id')
    @ApiOkResponse({ type: VisitOffset })
    freeVisit(@Param('id', new ParseIntPipe()) index: number): Promise<string[]> {
        return this.visitsService.freeVisit(index);
    }

    @Get('offset/:id')
    @ApiOkResponse({ type: VisitDto })
    @ApiImplicitParam({ name: 'id', required: true })
    search(@Param('id', new ParseIntPipe()) doctorId: number): Promise<VisitDto[]> {
        return this.visitsService.search(doctorId);
    }

}
