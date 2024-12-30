/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

/** Maximum number of iterations for {@link approximateEccentricAnomaly} before throwing. */
const MAX_ITERATIONS = 100;
/** The expected precision of the {@link approximateEccentricAnomaly} result. */
const EXPECTED_PRECISION = 1e-12;

/**
 * Implements Newton's method to solve the Kepler equation `𝑀 = 𝐸 - 𝑒 sin(𝐸)`.
 *
 * @param meanAnomaly The mean anomaly, in radians.
 * @param eccentricity The eccentricity of the orbit.
 * @param precision The minimum precision expected from the output.
 * @param maxIterations The maximum number of iterations before the function fails.
 * @throws
 */
export function approximateEccentricAnomaly(
    meanAnomaly: number,
    eccentricity: number,
    precision = EXPECTED_PRECISION,
    maxIterations = MAX_ITERATIONS,
): number {
    // Take an initial guess for the anomaly.
    let eccentricAnomaly = meanAnomaly;

    // Start a loop until convergence is achieved.
    for (let i = 0; i < maxIterations; i++) {
        // Take a step toward the solution.
        const nextGuess = eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly;
        const derivative = 1 - eccentricity * Math.cos(eccentricAnomaly);

        // Check the difference with the result.
        const delta = nextGuess / derivative;
        eccentricAnomaly -= delta;

        // Check if the delta is within the tolerance range.
        if (Math.abs(delta) < precision) {
            return eccentricAnomaly;
        }
    }

    // Convergence was not achieved, throw an error.
    throw new Error("Convergence not achieved.");
}
