import { GraphQLSchema, SelectionSetNode } from 'graphql';
import { IResolvers } from '@graphql-tools/utils';
import { Subschema, SubschemaConfig, StitchingInfo } from '@graphql-tools/delegate';
import { MergeTypeCandidate, MergeTypeFilter } from './types';
export declare function createStitchingInfo(subschemaMap: Map<GraphQLSchema | SubschemaConfig, Subschema>, typeCandidates: Record<string, Array<MergeTypeCandidate>>, mergeTypes?: boolean | Array<string> | MergeTypeFilter): StitchingInfo;
export declare function completeStitchingInfo(stitchingInfo: StitchingInfo, resolvers: IResolvers, schema: GraphQLSchema): StitchingInfo;
export declare function addStitchingInfo(stitchedSchema: GraphQLSchema, stitchingInfo: StitchingInfo): GraphQLSchema;
export declare function selectionSetContainsTopLevelField(selectionSet: SelectionSetNode, fieldName: string): boolean;
