/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { describe, expect, it } from "bun:test";
import { vec2 } from "gl-matrix";

import { findPositionOfBodyInOrbit } from "./orbit.js";
import { Temporal } from "@js-temporal/polyfill";
import { deriveSemiMajorAxis } from "./ellipse.js";

describe("Orbital Computation", function() {
    // The expected position of the planet on January 1st 2025 at 00:00 UTC.
    const cydoniaPosition = vec2.fromValues(0.43, -2.47);
    // The eccentricity axis of Cydonia's orbit around the sun.
    const cydoniaEccentricity = 0.123882942261059;
    // The semi-major axis of Cydonia's orbit around the sun.
    const cydoniaSemiMajorAxis = deriveSemiMajorAxis(2.276371635988, cydoniaEccentricity);
    // The time of the last pericenter passage for Cydonia's orbit.
    const cydoniaLastPericenterPassageTime = 59428.7288138116;

    it("should compute Cydonia's position", function() {
        // Get the position of the body.
        const position = findPositionOfBodyInOrbit(
            cydoniaSemiMajorAxis,
            cydoniaEccentricity,
            cydoniaLastPericenterPassageTime,
            Temporal.Instant.from("2025-01-01T00:00:00Z"),
        );

        // Compare the position to the expected location.
        expect(position[0]).toBeCloseTo(cydoniaPosition[0]);
        expect(position[1]).toBeCloseTo(cydoniaPosition[1]);
    });
});