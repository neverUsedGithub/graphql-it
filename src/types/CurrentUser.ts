import { FieldArray, Field, TransformFields } from "../field";
import { UserContext, userContext } from "./User";
import { TeamContext, teamContext } from "./Team";

export type CurrentUserContext = UserContext & {
    teams<T extends (ctx: TeamContext) => FieldArray>(getFields: T): Field<"teams", TransformFields<ReturnType<T>>[]>;
};

export const currentUserContext: Record<keyof CurrentUserContext, any> = {
    ...userContext,
    teams: (getFields: (ctx: TeamContext) => FieldArray) => `teams { ${getFields(teamContext).join(" ")} }`,
};
