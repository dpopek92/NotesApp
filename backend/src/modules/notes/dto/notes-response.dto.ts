import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { SearchParamsDto } from 'src/common/dto/search-params.dto';
import { NoteResponseDto } from './note-response.dto';

export class NotesResponseDto {
  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(NoteResponseDto) },
  })
  content: NoteResponseDto[];

  @ApiProperty({ type: SearchParamsDto })
  searchParams: SearchParamsDto;

  @ApiProperty({ type: Number })
  totalItems: number;
}
