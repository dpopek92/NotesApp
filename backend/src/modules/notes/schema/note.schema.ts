import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: true } })
export class Note {
  @Prop({ type: String, required: true, minlength: 1, maxlength: 50 })
  title: string;

  @Prop({ type: String, required: true, minlength: 1, maxlength: 500 })
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

export type NotesDocument = Note & Document & { _id: string; createdAt: Date };
