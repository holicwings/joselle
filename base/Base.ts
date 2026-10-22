import { Page } from "@playwright/test";

export abstract class Base {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
