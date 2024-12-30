/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { Temporal } from "@js-temporal/polyfill";

/** Type alias for the [Modified Julian Date](https://core2.gsfc.nasa.gov/time/). */
export type ModifiedJulianDate = number;

/**
 * Extracts a {@link Temporal} instant from the provided {@link ModifiedJulianDate}.
 * The returned instant is always rounded to the nearest millisecond.
 *
 * @param date The {@link ModifiedJulianDate} to convert into an {@link Temporal.Instant}.
 */
export function modifiedJulianDateToInstant(date: ModifiedJulianDate): Temporal.Instant {
    // Retrieve the number of days since the Unix epoch.
    const daysSinceUnixEpoch = date - UNIX_EPOCH_MODIFIED_JULIAN_DATE;

    // Convert the days to milliseconds.
    const millisecondsSinceUnixEpoch = Math.round(daysSinceUnixEpoch * 86_400_000);

    // Create a UTC instance from the number of seconds since epoch.
    return Temporal.Instant.fromEpochMilliseconds(millisecondsSinceUnixEpoch);
}

/**
 * Converts a given {@link Temporal} instant to a {@link ModifiedJulianDate}.
 * The returned date is always rounded to the nearest millisecond.
 *
 * @param instant The {@link Temporal.Instant} to convert into an {@link ModifiedJulianDate}.
 */
export function instantToModifiedJulianDate(instant: Temporal.Instant): ModifiedJulianDate {
    // Convert the milliseconds to days.
    const daysSinceUnixEpoch = Math.round(instant.epochMilliseconds) / 86_400_000;

    // Add the Unix timestamp epoch offset.
    return daysSinceUnixEpoch + UNIX_EPOCH_MODIFIED_JULIAN_DATE;
}

/** Modified Julian date of the Unix epoch (1st of January 1970, 00:00 UTC). */
const UNIX_EPOCH_MODIFIED_JULIAN_DATE = 40_587;
