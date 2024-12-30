/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { describe, expect, it } from "bun:test";

import { approximateEccentricAnomaly } from "./eccentric-anomaly.js";

describe("Eccentric Anomaly", function() {
    // The eccentricity of the earth's orbit.
    const earthEccentricity = 0.0167;
    // Pre-calculated mean anomaly that should produce a true anomaly of ~60°.
    const preCalculatedMeanAnomaly = 1.0327349269533974;
    const expectedAngle = 60 / 180 * Math.PI;

    it("should approximate a correct mean anomaly", function() {
        expect(approximateEccentricAnomaly(preCalculatedMeanAnomaly, earthEccentricity)).toBeCloseTo(expectedAngle, 6);
    });
});