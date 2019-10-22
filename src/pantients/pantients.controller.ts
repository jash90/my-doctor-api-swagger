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
import { CreatePantientDto } from './dto/create-pantient.dto';
import { PantientsService } from './pantients.service';
import { AuthGuard } from '@nestjs/passport';
import { Pantient as PantientEntity } from './pantient.entity';
import { PantientDto } from './dto/pantient.dto';
import { Request } from 'express';
import { UpdatePantientDto } from './dto/update-pantient.dto';

@Controller('pantients')
@ApiUseTags('pantients')
export class PantientsController {
    constructor(private readonly pantientsService: PantientsService) { }

    @Get()
    @ApiOkResponse({ type: [PantientDto] })
    findAll(): Promise<PantientDto[]> {
        return this.pantientsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: PantientDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<PantientDto> {
        return this.pantientsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: PantientEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createPantientDto: CreatePantientDto,
    ): Promise<PantientEntity> {
        return this.pantientsService.create(createPantientDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: PantientEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updatePantientDto: UpdatePantientDto,
    ): Promise<PantientEntity> {
        return this.pantientsService.update(id, updatePantientDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: PantientEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<PantientEntity> {
        return this.pantientsService.delete(id);
    }
}
