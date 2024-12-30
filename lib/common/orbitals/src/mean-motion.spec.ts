/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { describe, expect, it } from "bun:test";

import { extractMeanMotion, WellKnownGravitationalParameters } from "./mean-motion.js";

describe("Mean Motion", function() {
    // The mean motion of the earth around the sun in days.
    const earthMeanMotion = 1.72021241e-2;
    // The semi-major axis of the moon in its orbit around the earth.
    const moonSemiMajorAxis = 3.844e5 / 1.49598e8;
    // The mean motion of the moon around the earth in days.
    const moonMeanMotion = 2 * Math.PI / 27.3217;

    it("should derive the earth's mean motion", function() {
        expect(extractMeanMotion(1)).toBeCloseTo(earthMeanMotion, 6);
    });

    it("should derive the moon's mean motion", function() {
        expect(extractMeanMotion(
            moonSemiMajorAxis,
            WellKnownGravitationalParameters.earth,
        )).toBeCloseTo(moonMeanMotion);
    });
});