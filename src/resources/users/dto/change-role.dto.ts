import { IsEnum } from "class-validator";

import { UserRole } from "src/entities/enums/role.enum";


export class ChangeRoleDTO {
  @IsEnum(UserRole, { message: 'Role must be one of: admin, user, manager ...' })
  role: UserRole;
}
