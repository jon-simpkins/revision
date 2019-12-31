import { diff, applyChange } from 'deep-diff';

export function generateDiffToSave(oldDataStr: string, newDataStr: string): string {
    const differences = diff(
        JSON.parse(oldDataStr),
        JSON.parse(newDataStr)
    );

    return JSON.stringify(differences);
}

export function applyDiffs(oldValue: Object, diffs: Object[]): Object {
    const newValue = JSON.parse(JSON.stringify(oldValue));

    diffs.forEach(nextDiff => {
        applyChange(newValue, newValue, nextDiff);
    })

    return newValue;
}