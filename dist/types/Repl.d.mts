import { Field, FieldArray, TransformFields } from '../field.mjs';
import { LanguageContext } from './Language.mjs';
import { TagContext } from './Tag.mjs';

interface ReplContext {
    title: Field<"title", string>;
    id: Field<"id", string>;
    iconUrl: Field<"iconUrl", string>;
    url: Field<"url", string>;
    templateLabel: Field<"templateLabel", string>;
    isPrivate: Field<"isPrivate", boolean>;
    isRenamed: Field<"isRenamed", boolean>;
    imageUrl: Field<"imageUrl", string | null>;
    language: Field<"language", string>;
    likeCount: Field<"likeCount", number>;
    timeUpdated: Field<"timeUpdated", string>;
    timeCreated: Field<"timeCreated", string>;
    description: Field<"description", string | null>;
    publicForkCount: Field<"publicForkCount", number>;
    releasesForkCount: Field<"releasesForkCount", number>;
    slug: Field<"slug", string>;
    wasPosted: Field<"wasPosted", boolean>;
    wasPublished: Field<"wasPublished", boolean>;
    publishedAs: Field<"publishedAs", string | null>;
    lang<T extends (ctx: LanguageContext) => FieldArray>(getFields: T): Field<"lang", TransformFields<ReturnType<T>>>;
    tags<T extends (ctx: TagContext) => FieldArray>(getFields: T): Field<"tags", TransformFields<ReturnType<T>>[]>;
}
declare const replContext: Record<keyof ReplContext, any>;

export { ReplContext, replContext };
