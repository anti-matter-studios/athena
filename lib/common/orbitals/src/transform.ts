/*
 * Copyright © 2024-2024 - Anti-Matter Studios.
 * This file is part of the Cydonia project which is released under the MIT licence.
 * See https://github.com/anti-matter-studios/cydonia?tab=MIT-1-ov-file# for the full licence details. 
 */

import { quat, ReadonlyVec3 } from "gl-matrix";

/**
 * Creates the quaternion that can be used to map a position in the orbital plane
 * to the reference frame of the center body.
 *
 * @param orbit The euler-angles of the orbit to convert.
 */
export function createOrbitToReferenceQuaternion(orbit: ReadonlyVec3): quat {
    // Prepare the quaternion.
    const quaternion = quat.create();

    quat.rotateZ(quaternion, quaternion, orbit[0]);
    quat.rotateX(quaternion, quaternion, orbit[1]);
    quat.rotateZ(quaternion, quaternion, orbit[2]);

    return quaternion;
}