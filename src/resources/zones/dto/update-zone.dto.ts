import { PartialType } from '@nestjs/mapped-types';

import { CreateZoneDTO } from './create-zone.dto';


export class UpdateZoneDTO extends PartialType(CreateZoneDTO) {}