import {useAppSelector} from '../../app/hooks';
import {Button, Header, Segment} from 'semantic-ui-react';
import {selectStoryMap} from '../../features/storyList/storyListSlice';

import fileDownload from 'js-file-download';
import {WritingWorkspace} from '../../protos_v2';
import {addStoryToStorage, readAllStoriesFromStorage} from '../../features/storyList/storyListPersistence';

function clearWorkspace() {
  localStorage.clear();
  window.location.reload();
}

function downloadWorkspace() {
  const filename = 'writing_workspace_' + Date.now() + '.write';

  fileDownload(loadDataFromStorage(), filename);
}

async function uploadWorkspace(files: FileList|null) {
  if (!files) {
    return;
  }

  const fileData = await files[0].text();
  const uint8Array = new TextEncoder().encode(fileData);
  loadDataToStorage(uint8Array);

  window.location.reload();
}

export function loadDataFromStorage(): Uint8Array {
  const workspace = WritingWorkspace.create({
    stories: readAllStoriesFromStorage()
  });

  return WritingWorkspace.encode(workspace).finish();
}

export function loadDataToStorage(data: Uint8Array): void {
  const workspace = WritingWorkspace.decode(data);

  localStorage.clear();

  workspace.stories.forEach((story) => {
    addStoryToStorage(story);
  });
}


export default function DataManagementPage() {
  const storyMap = useAppSelector(selectStoryMap);

  return (
      <div style={{margin: '24px'}}>
        <Segment.Group >
          <Segment style={{display: 'flex'}}>
            <Header size='medium'>Data Management
              <Header.Subheader>
                Load, Save, or Clear your Workspace
              </Header.Subheader>
            </Header>
          </Segment>
          <Segment>
            {Object.keys(storyMap).length} Stories
          </Segment>
          <Segment>
            <Button color='green'
                    onClick={() => {downloadWorkspace()}}>
              Download Workspace
            </Button>
            <Button color='red'
                    onClick={() => {clearWorkspace()}}>
              Clear Workspace
            </Button>
          </Segment>
          <Segment>
            <Header size='small'>Upload Workspace</Header>
            <input type="file" accept=".write" onChange={(event) => uploadWorkspace(event.target.files)} />
          </Segment>
        </Segment.Group>
      </div>
  );
}
