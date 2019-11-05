import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiImplicitParam,
} from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SchedulesService } from './schedules.service';
import { AuthGuard } from '@nestjs/passport';
import { Schedule as ScheduleEntity } from './schedule.entity';
import { ScheduleDto } from './dto/schedule.dto';
import { Request } from 'express';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleOffset } from './dto/schedules.offset';

@Controller('schedules')
@ApiUseTags('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) { }

    @Get()
    @ApiOkResponse({ type: [ScheduleDto] })
    findAll(): Promise<ScheduleDto[]> {
        return this.schedulesService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: ScheduleDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: string): Promise<ScheduleDto> {
        return this.schedulesService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: ScheduleEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createScheduleDto: CreateScheduleDto,
    ): Promise<ScheduleEntity> {
        return this.schedulesService.create(createScheduleDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: ScheduleEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: string,
        @Body() updateScheduleDto: UpdateScheduleDto,
    ): Promise<ScheduleEntity> {
        return this.schedulesService.update(id, updateScheduleDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: ScheduleEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id', new ParseIntPipe()) id: string,
    ): Promise<ScheduleEntity> {
        return this.schedulesService.delete(id);
    }

    @Get(':id')
    @ApiOkResponse({ type: ScheduleDto })
    @ApiImplicitParam({ name: 'id', required: true })
    search(@Param('id', new ParseIntPipe()) id: string): Promise<ScheduleDto[]> {
        return this.schedulesService.search(id);
    }

    @Get(':id')
    @ApiOkResponse({ type: ScheduleOffset})
    offset(@Param('id', new ParseIntPipe()) index: number= 0): Promise<ScheduleOffset> {
        return this.schedulesService.offset(index);
    }
}
