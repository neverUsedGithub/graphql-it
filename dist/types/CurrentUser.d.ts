import { FieldArray, Field, TransformFields } from '../field.js';
import { UserContext } from './User.js';
import { TeamContext } from './Team.js';
import './Repl.js';
import './Language.js';
import './Tag.js';

type CurrentUserContext = UserContext & {
    teams<T extends (ctx: TeamContext) => FieldArray>(getFields: T): Field<"teams", TransformFields<ReturnType<T>>[]>;
};
declare const currentUserContext: Record<keyof CurrentUserContext, any>;

export { CurrentUserContext, currentUserContext };
