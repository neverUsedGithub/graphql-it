import { FieldArray, Field, TransformFields } from '../field.mjs';
import { UserContext } from './User.mjs';
import { TeamContext } from './Team.mjs';
import './Repl.mjs';
import './Language.mjs';
import './Tag.mjs';

type CurrentUserContext = UserContext & {
    teams<T extends (ctx: TeamContext) => FieldArray>(getFields: T): Field<"teams", TransformFields<ReturnType<T>>[]>;
};
declare const currentUserContext: Record<keyof CurrentUserContext, any>;

export { CurrentUserContext, currentUserContext };
