import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { SearchNotesParamsDto } from './dto/search-notes-dto';
import { ValidateMongoIdParam } from '../../common/pipes/validate-mongoid-param.pipe';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiOkResponse } from '@nestjs/swagger';
import { NoteResponseDto } from './dto/note-response.dto';
import { NotesResponseDto } from './dto/notes-response.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOkResponse({ type: NoteResponseDto })
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @SkipThrottle()
  @ApiOkResponse({ type: NotesResponseDto })
  @Get()
  findAll(@Query() searchParams: SearchNotesParamsDto) {
    return this.notesService.findAll(searchParams);
  }

  @SkipThrottle()
  @ApiOkResponse({ type: NoteResponseDto })
  @Get(':id')
  findOne(@Param('id', ValidateMongoIdParam) id: string) {
    return this.notesService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: NoteResponseDto })
  update(
    @Param('id', ValidateMongoIdParam) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  remove(@Param('id', ValidateMongoIdParam) id: string) {
    return this.notesService.remove(id);
  }
}
