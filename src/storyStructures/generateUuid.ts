import * as uuid from 'uuid/v4';

let currentlyMocking = false;
let mockCount = 0;

export function setCurrentlyMocking(newVal: boolean) {
    currentlyMocking = newVal;
}

export function resetMockCount() {
    mockCount = 0;
}

// Wrapper provided to insist on uuid formatting, and to allow easier stubbing in unit tests
export function generateUuid(): string {
    if (currentlyMocking) {
        mockCount += 1;
        return 'uuid' + mockCount;
    }

    return uuid().replace(/-/g, '');
}