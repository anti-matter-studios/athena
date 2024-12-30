/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

/**
 * List of well-known gravitational parameters in the solar system.
 * All the values are provided in AU³day⁻² (Astronomical units cubed per day squared).
 *
 * Extracted from [JPL Astrodynamic Parameters](https://ssd.jpl.nasa.gov/astro_par.html).
 * Converted to AU³day⁻² with [Wolfram Alpha](https://www.wolframalpha.com/).
 */
export const WellKnownGravitationalParameters = {
    sun: 2.959122082841195e-4,
    mercury: 4.912500195e-11,
    venus: 7.2434523326e-10,
    earth: 8.8876924467e-10,
    mars: 9.54954883e-11,
    jupiter: 2.8253458252258e-7,
    saturn: 8.459705993376e-8,
    uranus: 1.292026564968e-8,
    neptune: 1.524357347885e-8,
} as const;

/**
 * Extracts the mean motion of an orbit from its semi-major axis and the provided gravitational parameter.
 * Defaults to a heliocentric orbit.
 *
 * @param semiMajorAxis The semi-major axis of the orbit in Astronomical Units.
 * @param gravitationalParameter The gravitational parameter used in the computation.
 */
export function extractMeanMotion(
    semiMajorAxis: number,
    gravitationalParameter: number = WellKnownGravitationalParameters.sun,
): number {
    return Math.sqrt(gravitationalParameter / Math.pow(semiMajorAxis, 3));
}