/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

/**
 * Derives the true anomaly from the given eccentric anomaly and orbital elements.
 *
 * @param eccentricAnomalyRadians The eccentric anomaly, in radians.
 * @param eccentricity The eccentricity of the orbit,
 */
export function deriveTrueAnomaly(eccentricAnomalyRadians: number, eccentricity: number): number {
    return (
        2 *
        Math.atan2(
            Math.sqrt(1 + eccentricity) * Math.sin(eccentricAnomalyRadians / 2),
            Math.sqrt(1 - eccentricity) * Math.cos(eccentricAnomalyRadians / 2),
        )
    );
}
