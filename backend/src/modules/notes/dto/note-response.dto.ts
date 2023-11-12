import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';

export class NoteResponseDto extends CreateNoteDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: string;
}
