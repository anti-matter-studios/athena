/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { describe, expect, it } from "bun:test";
import { vec3 } from "gl-matrix";

import { deriveSemiMajorAxis } from "./ellipse.js";
import { findPositionOfBodyInOrbit } from "./orbit.js";
import { createOrbitToReferenceQuaternion } from "./transform.js";
import { modifiedJulianDateToInstant } from "./conversion.js";

describe("Quaternion", function() {
    // The expected position of the planet on January 1st 2025 at 00:00 UTC.
    const cydoniaPosition = vec3.fromValues(-0.515448921852703, 2.51824712548305, 0.431566514908639);
    // The eccentricity axis of Cydonia's orbit around the sun.
    const cydoniaEccentricity = 0.123882942261059;
    // The semi-major axis of Cydonia's orbit around the sun.
    const cydoniaSemiMajorAxis = deriveSemiMajorAxis(2.276371635988, cydoniaEccentricity);
    // The time of the last pericenter passage for Cydonia's orbit.
    const cydoniaLastPericenterPassageTime = 59428.7288138116;
    // Euler angles of Cydonia's orbit.
    const cydoniaEulerAngles = vec3.fromValues(5.7248819799, 0.2276590959, 4.03814655777);

    it("should compute the correct position of Cydonia in its orbit", function() {
        // Get the position of the body in its orbit.
        const orbitalPosition = findPositionOfBodyInOrbit(
            cydoniaSemiMajorAxis,
            cydoniaEccentricity,
            cydoniaLastPericenterPassageTime,
            modifiedJulianDateToInstant(60600.0),
        );

        // Create the transformation quaternion.
        const quaternion = createOrbitToReferenceQuaternion(cydoniaEulerAngles);
        expect(quaternion[0]).toBeCloseTo(0.07552775740623474);
        expect(quaternion[1]).toBeCloseTo(0.08483429998159409);
        expect(quaternion[2]).toBeCloseTo(-0.979353129863739);
        expect(quaternion[3]).toBeCloseTo(0.16723088920116425);

        // Apply the transformation.
        const truePosition = vec3.transformQuat(
            vec3.create(),
            vec3.fromValues(orbitalPosition[0], orbitalPosition[1], 0),
            quaternion,
        );

        // Validate the position.
        expect(truePosition[0]).toBeCloseTo(cydoniaPosition[0], 6);
        expect(truePosition[1]).toBeCloseTo(cydoniaPosition[1], 6);
        expect(truePosition[2]).toBeCloseTo(cydoniaPosition[2], 6);
    });
});