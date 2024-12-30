/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

/**
 * Derives an ellipse's semi-major axis from its closest approach and eccentricity.
 *
 * @param closestApproach The closest distance between the ellipse and its foci.
 * @param eccentricity The eccentricity of the ellipse.
 */
export function deriveSemiMajorAxis(closestApproach: number, eccentricity: number): number {
    return closestApproach / (1 - eccentricity);
}
