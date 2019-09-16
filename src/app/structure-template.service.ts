import {ApplicationRef, Injectable} from '@angular/core';
import {StoryStructure} from '../types/StoryStructure/StoryStructure';

export class StructureOption {
  constructor(public label: string, public id: string) {

  }
}

const ThreeActEqualStr = `
{
    "totalDurationSec": 180,
    "blocks": [
        {
            "startTime": 0,
            "label": "First Beat",
            "description": "First third"
        },
        {
            "startTime": 60,
            "label": "Second Block",
            "description": "Middle third"
        },
        {
            "startTime": 120,
            "label": "Third Block",
            "description": "Final third"
        }
    ],
    "name": "Three Equal Acts",
    "id": "0f5a5a7d-53d4-4a11-be2d-f06e52eaf59d"
}
`;

const ThreeActStr = `
{
    "totalDurationSec": 240,
    "blocks": [
        {
            "startTime": 0,
            "label": "Act 1",
            "description": "Introduce original world, need for improvement"
        },
        {
            "startTime": 60,
            "label": "Act 2a",
            "description": "Adventure, original world changes for the better, superficially"
        },
        {
            "startTime": 120,
            "label": "Act 2b",
            "description": "Chip away at the \\"success\\" in 2a, let the villain break the hero"
        },
        {
            "startTime": 180,
            "label": "Act 3",
            "description": "Hero completes inner change from adventure, achieves true victory"
        }
    ],
    "name": "Three Act (Typical)",
    "id": "6ecf3229-d92a-4cad-8964-a5bd3be32045"
}
`;

const TEMPLATE_KEY = 'STRUCTURE_TEMPLATES';

@Injectable({
  providedIn: 'root'
})
export class StructureTemplateService {

  knownStructures: StoryStructure[] = [];
  options: StructureOption[] = [];

  constructor(private appRef: ApplicationRef) {
    if (localStorage.getItem(TEMPLATE_KEY)) {
      JSON.parse(localStorage.getItem(TEMPLATE_KEY)).forEach(structureStr => {
        this.knownStructures.push(StoryStructure.fromString(structureStr));
      });
    } else {
      // Add defaults
      this.knownStructures.push(StoryStructure.fromString(ThreeActStr));
      this.knownStructures.push(StoryStructure.fromString(ThreeActEqualStr));
    }

    this.buildOptions();
  }

  addOption(newTemplate: StoryStructure) {
    this.knownStructures.push(newTemplate);

    this.persistTemplates();

    this.buildOptions();
  }

  persistTemplates() {
    localStorage.setItem(TEMPLATE_KEY, JSON.stringify(
      this.knownStructures.map(structure => {
        return structure.toString();
      })
    ));
  }

  deleteTemplate(id: string) {
    this.knownStructures = this.knownStructures.filter(structure => {
      return structure.id !== id;
    });

    this.persistTemplates();
    this.buildOptions();
  }

  buildOptions() {
    this.options = this.knownStructures.map(structure => {
      return new StructureOption(structure.name, structure.id);
    });
  }

  getOptions(): StructureOption[] {
    return this.options;
  }

  getStructureById(id: string) {
    for (let i = 0; i < this.knownStructures.length; i++) {
      if (this.knownStructures[i].id === id) {
        return this.knownStructures[i].clone();
      }
    }
    return null;
  }
}
