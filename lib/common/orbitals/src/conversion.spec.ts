/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { describe, expect, it } from "bun:test";
import { Temporal } from "@js-temporal/polyfill";

import { instantToModifiedJulianDate, modifiedJulianDateToInstant } from "./conversion.js";

describe("Conversion", function() {
    // Create an instant for 09:30 AM October 1st 1997 Paris time.
    const instant = Temporal.ZonedDateTime.from({
        year: 1997,
        month: 10,
        day: 1,
        hour: 9,
        minute: 30,
        second: 0,
        microsecond: 0,
        timeZone: "Europe/Paris",
    }).toInstant();

    // 09:30 AM October 1st 1997 as a Modified Julian Date.
    const mjd = 50722.3125;

    it("should convert from MJD to Temporal.Instant", function() {
        // Compare the instant with the appropriate MJD.
        expect(modifiedJulianDateToInstant(mjd).epochMilliseconds).toBe(instant.epochMilliseconds);
    });

    it("should convert from Temporal.Instant to MJD", function() {
        // Compare the instant with the appropriate MJD.
        expect(instantToModifiedJulianDate(instant)).toBe(mjd);
    });
});