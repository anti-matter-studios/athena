/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { describe, expect, it } from "bun:test";

import { deriveTrueAnomaly } from "./true-anomaly.js";

describe("True Anomaly", function() {
    // The eccentricity of the earth's orbit.
    const earthEccentricity = 0.0167;
    // Pre-calculated eccentric anomaly that should produce a true anomaly of ~190°.
    const preCalculatedEccentricAnomaly = 3.319049751076655;
    const expectedAngle = 190 / 180 * Math.PI;

    it("should derive a correct true anomaly", function() {
        expect(deriveTrueAnomaly(preCalculatedEccentricAnomaly, earthEccentricity)).toBeCloseTo(expectedAngle, 6);
    });
});