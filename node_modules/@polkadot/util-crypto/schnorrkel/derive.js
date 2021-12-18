// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { assert, isU8a } from '@polkadot/util';
import { schnorrkelKeypairFromU8a } from "./keypair/fromU8a.js";
import { schnorrkelKeypairToU8a } from "./keypair/toU8a.js";
export function createDeriveFn(derive) {
  return (keypair, chainCode) => {
    assert(isU8a(chainCode) && chainCode.length === 32, 'Invalid chainCode passed to derive');
    return schnorrkelKeypairFromU8a(derive(schnorrkelKeypairToU8a(keypair), chainCode));
  };
}