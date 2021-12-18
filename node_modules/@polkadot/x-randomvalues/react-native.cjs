"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomValues = void 0;
Object.defineProperty(exports, "packageInfo", {
  enumerable: true,
  get: function () {
    return _packageInfo.packageInfo;
  }
});

var _reactNative = require("react-native");

var _xGlobal = require("@polkadot/x-global");

var _fallback = require("./fallback.cjs");

var _packageInfo = require("./packageInfo.cjs");

// Copyright 2017-2021 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Adapted from https://github.com/LinusU/react-native-get-random-values/blob/85f48393821c23b83b89a8177f56d3a81dc8b733/index.js
// Copyright (c) 2018, 2020 Linus Unnebäck
// SPDX-License-Identifier: MIT
function getRandomValuesNative(output) {
  const bytes = Buffer.from(_reactNative.NativeModules.RNGetRandomValues.getRandomBase64(output.length), 'base64');

  for (let i = 0; i < bytes.length; i++) {
    output[i] = bytes[i];
  }

  return output;
}

function getRandomValuesGlobal(output) {
  return crypto.getRandomValues(output);
}

const getRandomValues = typeof _xGlobal.xglobal.crypto === 'object' && typeof _xGlobal.xglobal.crypto.getRandomValues === 'function' ? getRandomValuesGlobal // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
: typeof _xGlobal.xglobal.nativeCallSyncHook === 'undefined' || !_reactNative.NativeModules.ExpoRandom ? _fallback.insecureRandomValues : getRandomValuesNative;
exports.getRandomValues = getRandomValues;