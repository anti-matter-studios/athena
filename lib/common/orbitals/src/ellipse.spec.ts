/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { describe, expect, it } from "bun:test";

import { deriveSemiMajorAxis } from "./ellipse.js";

describe("Ellipse", function() {
    // The pericenter distance of the Earth around the Sun, in AU.
    const earthPericenterDistance = 0.9833;
    // The eccentricity of the earth's orbit.
    const earthEccentricity = 0.0167;

    it("should derive the appropriate semi-major axis", function() {
        // Compare the instant with the appropriate MJD.
        expect(deriveSemiMajorAxis(earthPericenterDistance, earthEccentricity)).toBeCloseTo(1, 6);
    });
});