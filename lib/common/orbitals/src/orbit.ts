/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { Temporal } from "@js-temporal/polyfill";
import { vec2 } from "gl-matrix";

import { extractMeanMotion, WellKnownGravitationalParameters } from "./mean-motion.js";
import { instantToModifiedJulianDate } from "./conversion.js";
import { approximateEccentricAnomaly } from "./eccentric-anomaly.js";
import { deriveTrueAnomaly } from "./true-anomaly.js";

/**
 * Extracts the position of a body in the given orbit ellipse.
 *
 * @param semiMajorAxis The semi-major axis of the ellipse, in AU.
 * @param eccentricity The eccentricity of the ellipse.
 * @param timeOfPericenterPassage The last passage of the body through the pericenter, in MJD.
 * @param instant The instant to calculate for. Defaults to now.
 * @param gravitationalParameter The gravitational parameter of the parent body. Default to the Sun's.
 */
export function findPositionOfBodyInOrbit(
    semiMajorAxis: number,
    eccentricity: number,
    timeOfPericenterPassage: number,
    instant = Temporal.Now.instant(),
    gravitationalParameter: number = WellKnownGravitationalParameters.sun,
): vec2 {
    // Derive the mean motion from the orbit.
    const meanMotion = extractMeanMotion(semiMajorAxis, gravitationalParameter);

    // Get the time between the provided instant and the time of the last pericenter.
    const timeSincePericenter = instantToModifiedJulianDate(instant) - timeOfPericenterPassage;

    // Get the mean anomaly from the mean motion and the time.
    const meanAnomaly = meanMotion * timeSincePericenter;

    // Approximate an eccentric anomaly from the mean anomaly.
    const eccentricAnomaly = approximateEccentricAnomaly(meanAnomaly, eccentricity);

    // Derive the true anomaly.
    const trueAnomaly = deriveTrueAnomaly(eccentricAnomaly, eccentricity);

    // Get the radius from the true anomaly.
    const radius = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

    // Build a vector from the values.
    return vec2.fromValues(radius * Math.cos(trueAnomaly), radius * Math.sin(trueAnomaly));
}