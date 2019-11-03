import {Injectable} from '@angular/core';
import {StoryStructure} from '../../types/StoryStructure/StoryStructure';

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

const BohemianStr = `
{
    "totalDurationSec": 355,
    "blocks": [
        {
            "startTime": 0,
            "label": "Intro",
            "description": "Cold open, introduce a few elements and rearrange them",
            "refId": "85a2bb6b-fd29-4a15-ae29-26ec7fe4b5c5"
        },
        {
            "startTime": 48,
            "label": "Ballad",
            "description": "Bring in a new element, continue a more traditional story for a few beats, establish trajectory",
            "refId": "cf6fdce0-805d-4326-a214-460f19764c5c"
        },
        {
            "startTime": 156,
            "label": "Guitar Solo",
            "description": "Original elements cut out, left only with what was introduced in the ballad, build in intensity",
            "refId": "fe914115-1963-4101-9099-5a57356a500c"
        },
        {
            "startTime": 186,
            "label": "Opera",
            "description": "Intense layering of original elements with new elements, build and build to almost breaking point",
            "refId": "391f4f73-5d61-4fa0-9570-842ade6f295a"
        },
        {
            "startTime": 246,
            "label": "Hard Rock",
            "description": "Have fun, please the crowd, you've earned it",
            "refId": "58a58d11-4a00-4678-832b-a51cabcb7a6d"
        },
        {
            "startTime": 295,
            "label": "Outro",
            "description": "Come back down, tie to original elements, the new elements leave exhausted",
            "refId": "6d26fcaf-e311-44b5-b288-af774e6e500a"
        }
    ],
    "name": "Bohemian Rhapsody",
    "id": "cf93a4a6-3391-4b23-83a9-2841c1219a4d"
}
`;

const TEMPLATE_KEY = 'STRUCTURE_TEMPLATES';

@Injectable({
  providedIn: 'root'
})
export class StructureTemplateService {

  knownStructures: StoryStructure[] = [];
  options: StructureOption[] = [];

  constructor() {
    if (localStorage.getItem(TEMPLATE_KEY)) {
      JSON.parse(localStorage.getItem(TEMPLATE_KEY)).forEach(structureStr => {
        this.knownStructures.push(StoryStructure.fromString(structureStr));
      });
    } else {
      // Add defaults
      this.knownStructures.push(StoryStructure.fromString(ThreeActStr));
      this.knownStructures.push(StoryStructure.fromString(ThreeActEqualStr));
      this.knownStructures.push(StoryStructure.fromString(BohemianStr));
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
