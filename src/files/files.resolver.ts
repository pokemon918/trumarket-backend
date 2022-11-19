import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { HasRole } from "src/auth/decorators/has-role.decorator";
import { UserRole } from "src/users/schemas/user.schema";
import { FilesService } from "./files.service";

@Resolver()
@HasRole(UserRole.admin)
export class FilesResolver {
  constructor(private filesService: FilesService) { }

  @Mutation(() => Boolean)
  deleteFiles(@Args('filenames', { type: () => [String] }) filenames: string[]) {
    return this.filesService.deleteFiles(filenames);
  }
}
