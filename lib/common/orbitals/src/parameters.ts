/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import type { ReadonlyVec3 } from "gl-matrix";

import type { ModifiedJulianDate } from "./conversion.js";

/**
 * Parameters used to describe the position of a body in its orbit at a given date.
 * The center of the referential is always the barycenter of the orbit,
 * with the Î vector pointing towards the vernal equinox.
 */
export interface OrbitalPositionParameters {
    /** The MJD time of the measurement. */
    readonly time: ModifiedJulianDate;
    /** The position of the body in its orbit, in AU. */
    readonly position: ReadonlyVec3;
    /** The velocity of the body in its orbit, in AU/day. */
    readonly velocity: ReadonlyVec3;
}

/** Parameters used to describe the ellipse of a given orbit. */
export interface OrbitalEllipseParameters {
    /** The semi-major axis of the orbit, in AU. */
    readonly semiMajorAxis: number;
    /** The eccentricity of the orbit. */
    readonly eccentricity: number;
    /** The last passage of the body through the pericenter, in MJD. */
    readonly timeOfPericenterPassage: ModifiedJulianDate;
    /**
     * The orientation of the orbit relative to the parent body's reference plane.
     * Expressed as euler angles, in radians, where:
     * - The first value (𝛼) is the inclination of the orbit.
     * - The second value (𝛽) is the longitude of the ascending node.
     * - The last value (𝛾) is the argument of perigee.
     */
    readonly orientation: ReadonlyVec3;
}

/** Descriptor of a body and its orbital parameters. */
export interface OrbitalBody {
    /** A common name for the body. */
    readonly name: string;
    /** The IAU designation of the body. */
    readonly designation: string;
    /** The position of the body in its orbit. */
    readonly position: OrbitalPositionParameters;
    /** The ellipse of the orbit. */
    readonly ellipse: OrbitalEllipseParameters;
}