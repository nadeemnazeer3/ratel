// Copyright 2020 Dgraph Labs, Inc. and Contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { getDgraphClientStub } from "lib/helpers";

export const GET_INSTANCE_HEALTH_RESULT = "cluster/GET_INSTANCE_HEALTH_RESULT";

export function getInstanceHealth() {
    return async (dispatch, getState) => {
        const { url } = getState();

        const client = await getDgraphClientStub(url.url);
        const health = await client.health();
        dispatch(getInstanceHealthResult(health));
    };
}

function getInstanceHealthResult(json) {
    return {
        type: GET_INSTANCE_HEALTH_RESULT,
        json,
    };
}
