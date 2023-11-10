import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SearchParamsDto } from '../../../common/dto/search-params.dto';

export class SearchNotesParamsDto extends SearchParamsDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  title?: string;
}
