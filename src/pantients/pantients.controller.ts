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
import { PantientOffset } from './dto/pantient.offset';

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
    findOne(@Param('id', new ParseIntPipe()) id: string): Promise<PantientDto> {
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
        @Param('id', new ParseIntPipe()) id: string,
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
        @Param('id', new ParseIntPipe()) id: string,
    ): Promise<PantientEntity> {
        return this.pantientsService.delete(id);
    }
    
    @Get(':id')
    @ApiOkResponse({ type: PantientOffset})
    offset(@Param('id', new ParseIntPipe()) index: number= 0): Promise<PantientOffset> {
        return this.pantientsService.offset(index);
    }
}
