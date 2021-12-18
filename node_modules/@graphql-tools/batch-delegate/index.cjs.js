'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const graphql = require('graphql');
const DataLoader = _interopDefault(require('dataloader'));
const delegate = require('@graphql-tools/delegate');
require('tslib');

var VisitSchemaKind;
(function (VisitSchemaKind) {
    VisitSchemaKind["TYPE"] = "VisitSchemaKind.TYPE";
    VisitSchemaKind["SCALAR_TYPE"] = "VisitSchemaKind.SCALAR_TYPE";
    VisitSchemaKind["ENUM_TYPE"] = "VisitSchemaKind.ENUM_TYPE";
    VisitSchemaKind["COMPOSITE_TYPE"] = "VisitSchemaKind.COMPOSITE_TYPE";
    VisitSchemaKind["OBJECT_TYPE"] = "VisitSchemaKind.OBJECT_TYPE";
    VisitSchemaKind["INPUT_OBJECT_TYPE"] = "VisitSchemaKind.INPUT_OBJECT_TYPE";
    VisitSchemaKind["ABSTRACT_TYPE"] = "VisitSchemaKind.ABSTRACT_TYPE";
    VisitSchemaKind["UNION_TYPE"] = "VisitSchemaKind.UNION_TYPE";
    VisitSchemaKind["INTERFACE_TYPE"] = "VisitSchemaKind.INTERFACE_TYPE";
    VisitSchemaKind["ROOT_OBJECT"] = "VisitSchemaKind.ROOT_OBJECT";
    VisitSchemaKind["QUERY"] = "VisitSchemaKind.QUERY";
    VisitSchemaKind["MUTATION"] = "VisitSchemaKind.MUTATION";
    VisitSchemaKind["SUBSCRIPTION"] = "VisitSchemaKind.SUBSCRIPTION";
})(VisitSchemaKind || (VisitSchemaKind = {}));
var MapperKind;
(function (MapperKind) {
    MapperKind["TYPE"] = "MapperKind.TYPE";
    MapperKind["SCALAR_TYPE"] = "MapperKind.SCALAR_TYPE";
    MapperKind["ENUM_TYPE"] = "MapperKind.ENUM_TYPE";
    MapperKind["COMPOSITE_TYPE"] = "MapperKind.COMPOSITE_TYPE";
    MapperKind["OBJECT_TYPE"] = "MapperKind.OBJECT_TYPE";
    MapperKind["INPUT_OBJECT_TYPE"] = "MapperKind.INPUT_OBJECT_TYPE";
    MapperKind["ABSTRACT_TYPE"] = "MapperKind.ABSTRACT_TYPE";
    MapperKind["UNION_TYPE"] = "MapperKind.UNION_TYPE";
    MapperKind["INTERFACE_TYPE"] = "MapperKind.INTERFACE_TYPE";
    MapperKind["ROOT_OBJECT"] = "MapperKind.ROOT_OBJECT";
    MapperKind["QUERY"] = "MapperKind.QUERY";
    MapperKind["MUTATION"] = "MapperKind.MUTATION";
    MapperKind["SUBSCRIPTION"] = "MapperKind.SUBSCRIPTION";
    MapperKind["DIRECTIVE"] = "MapperKind.DIRECTIVE";
    MapperKind["FIELD"] = "MapperKind.FIELD";
    MapperKind["COMPOSITE_FIELD"] = "MapperKind.COMPOSITE_FIELD";
    MapperKind["OBJECT_FIELD"] = "MapperKind.OBJECT_FIELD";
    MapperKind["ROOT_FIELD"] = "MapperKind.ROOT_FIELD";
    MapperKind["QUERY_ROOT_FIELD"] = "MapperKind.QUERY_ROOT_FIELD";
    MapperKind["MUTATION_ROOT_FIELD"] = "MapperKind.MUTATION_ROOT_FIELD";
    MapperKind["SUBSCRIPTION_ROOT_FIELD"] = "MapperKind.SUBSCRIPTION_ROOT_FIELD";
    MapperKind["INTERFACE_FIELD"] = "MapperKind.INTERFACE_FIELD";
    MapperKind["INPUT_OBJECT_FIELD"] = "MapperKind.INPUT_OBJECT_FIELD";
    MapperKind["ARGUMENT"] = "MapperKind.ARGUMENT";
    MapperKind["ENUM_VALUE"] = "MapperKind.ENUM_VALUE";
})(MapperKind || (MapperKind = {}));

function relocatedError(originalError, path) {
    return new graphql.GraphQLError(originalError.message, originalError.nodes, originalError.source, originalError.positions, path === null ? undefined : path === undefined ? originalError.path : path, originalError.originalError, originalError.extensions);
}

const cache1 = new WeakMap();
function createBatchFn(options) {
    var _a;
    const argsFromKeys = (_a = options.argsFromKeys) !== null && _a !== void 0 ? _a : ((keys) => ({ ids: keys }));
    const { valuesFromResults, lazyOptionsFn } = options;
    return async (keys) => {
        const results = await delegate.delegateToSchema({
            returnType: new graphql.GraphQLList(graphql.getNamedType(options.info.returnType)),
            onLocatedError: originalError => relocatedError(originalError, originalError.path.slice(0, 0).concat(originalError.path.slice(2))),
            args: argsFromKeys(keys),
            ...(lazyOptionsFn == null ? options : lazyOptionsFn(options)),
        });
        if (results instanceof Error) {
            return keys.map(() => results);
        }
        const values = valuesFromResults == null ? results : valuesFromResults(results, keys);
        return Array.isArray(values) ? values : keys.map(() => values);
    };
}
function getLoader(options) {
    var _a;
    const fieldName = (_a = options.fieldName) !== null && _a !== void 0 ? _a : options.info.fieldName;
    let cache2 = cache1.get(options.info.fieldNodes);
    if (cache2 === undefined) {
        cache2 = new WeakMap();
        cache1.set(options.info.fieldNodes, cache2);
        const loaders = Object.create(null);
        cache2.set(options.schema, loaders);
        const batchFn = createBatchFn(options);
        const loader = new DataLoader(keys => batchFn(keys), options.dataLoaderOptions);
        loaders[fieldName] = loader;
        return loader;
    }
    let loaders = cache2.get(options.schema);
    if (loaders === undefined) {
        loaders = Object.create(null);
        cache2.set(options.schema, loaders);
        const batchFn = createBatchFn(options);
        const loader = new DataLoader(keys => batchFn(keys), options.dataLoaderOptions);
        loaders[fieldName] = loader;
        return loader;
    }
    let loader = loaders[fieldName];
    if (loader === undefined) {
        const batchFn = createBatchFn(options);
        loader = new DataLoader(keys => batchFn(keys), options.dataLoaderOptions);
        loaders[fieldName] = loader;
    }
    return loader;
}

function batchDelegateToSchema(options) {
    const key = options.key;
    if (key == null) {
        return null;
    }
    else if (Array.isArray(key) && !key.length) {
        return [];
    }
    const loader = getLoader(options);
    return Array.isArray(key) ? loader.loadMany(key) : loader.load(key);
}

function createBatchDelegateFn(optionsOrArgsFromKeys, lazyOptionsFn, dataLoaderOptions, valuesFromResults) {
    return typeof optionsOrArgsFromKeys === 'function'
        ? createBatchDelegateFnImpl({
            argsFromKeys: optionsOrArgsFromKeys,
            lazyOptionsFn,
            dataLoaderOptions,
            valuesFromResults,
        })
        : createBatchDelegateFnImpl(optionsOrArgsFromKeys);
}
function createBatchDelegateFnImpl(options) {
    return batchDelegateOptions => {
        const loader = getLoader({
            ...options,
            ...batchDelegateOptions,
        });
        return loader.load(batchDelegateOptions.key);
    };
}

exports.batchDelegateToSchema = batchDelegateToSchema;
exports.createBatchDelegateFn = createBatchDelegateFn;
//# sourceMappingURL=index.cjs.js.map
