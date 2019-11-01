import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class UpdatePantientDto {
    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly firstName?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly lastName?: string;

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
    @IsPhoneNumber("PL")
    readonly phone?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    readonly pesel?: string;
}