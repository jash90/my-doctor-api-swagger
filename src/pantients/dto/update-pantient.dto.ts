import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePantientDto {
    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly firstname?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly lastname?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(6)
    readonly postcode?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly street?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly city?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsPhoneNumber('PL')
    readonly phone?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    readonly pesel?: string;
}
