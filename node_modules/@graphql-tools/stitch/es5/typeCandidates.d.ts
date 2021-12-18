import { DocumentNode, GraphQLNamedType, GraphQLDirective, SchemaDefinitionNode, SchemaExtensionNode, GraphQLSchema } from 'graphql';
import { Subschema, SubschemaConfig, StitchingInfo } from '@graphql-tools/delegate';
import { GraphQLParseOptions, ITypeDefinitions, TypeMap } from '@graphql-tools/utils';
import { MergeTypeCandidate, MergeTypeFilter, OnTypeConflict, TypeMergingOptions } from './types';
export declare function buildTypeCandidates({ subschemas, originalSubschemaMap, types, typeDefs, parseOptions, extensions, directiveMap, schemaDefs, operationTypeNames, mergeDirectives, }: {
    subschemas: Array<Subschema>;
    originalSubschemaMap: Map<Subschema, GraphQLSchema | SubschemaConfig>;
    types: Array<GraphQLNamedType>;
    typeDefs: ITypeDefinitions;
    parseOptions: GraphQLParseOptions;
    extensions: Array<DocumentNode>;
    directiveMap: Record<string, GraphQLDirective>;
    schemaDefs: {
        schemaDef: SchemaDefinitionNode;
        schemaExtensions: Array<SchemaExtensionNode>;
    };
    operationTypeNames: Record<string, any>;
    mergeDirectives: boolean;
}): Record<string, Array<MergeTypeCandidate>>;
export declare function buildTypes({ typeCandidates, directives, stitchingInfo, operationTypeNames, onTypeConflict, mergeTypes, typeMergingOptions, }: {
    typeCandidates: Record<string, Array<MergeTypeCandidate>>;
    directives: Array<GraphQLDirective>;
    stitchingInfo: StitchingInfo;
    operationTypeNames: Record<string, any>;
    onTypeConflict: OnTypeConflict;
    mergeTypes: boolean | Array<string> | MergeTypeFilter;
    typeMergingOptions: TypeMergingOptions;
}): {
    typeMap: TypeMap;
    directives: Array<GraphQLDirective>;
};
