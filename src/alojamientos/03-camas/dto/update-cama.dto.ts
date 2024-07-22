import { PartialType } from '@nestjs/mapped-types';
import { CreateCamaDto } from './create-cama.dto';

export class UpdateCamaDto extends PartialType(CreateCamaDto) {}
