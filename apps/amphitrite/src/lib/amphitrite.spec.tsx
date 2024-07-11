/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import { render } from "@testing-library/react";

import Amphitrite from "./amphitrite";


describe("Amphitrite", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<Amphitrite />);
        expect(baseElement).toBeTruthy();
    });
});
