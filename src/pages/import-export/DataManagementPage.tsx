import {useAppSelector} from '../../app/hooks';
import {Button, Icon, Header, Segment} from 'semantic-ui-react';

import fileDownload from 'js-file-download';
import {WritingWorkspace} from '../../protos_v2';
import {addScrapToStorage, readAllScrapsFromStorage} from '../../features/scrapList/scrapListPersistence';
import {selectScrapMap} from '../../features/scrapList/scrapListSlice';
import {readContactInfoFromStorage, writeContactInfoToStorage} from '../print-scrap/contactInfoPersistence';

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

  const fileData = await files[0].arrayBuffer();
  const parsedData = new Uint8Array(fileData);
  loadDataToStorage(parsedData);

  window.location.reload();
}

export function loadDataFromStorage(): Uint8Array {
  const contactInfo = readContactInfoFromStorage();

  const workspace = WritingWorkspace.create({
    author: contactInfo.author,
    contactInfo: contactInfo.contactInfo,
    scraps: readAllScrapsFromStorage(),
  });

  return WritingWorkspace.encode(workspace).finish();
}

export function loadDataToStorage(data: Uint8Array): void {
  const workspace = WritingWorkspace.decode(data);

  localStorage.clear();

  workspace.scraps.forEach((scrap) => {
    addScrapToStorage(scrap);
  });

  writeContactInfoToStorage({
    author: workspace.author,
    contactInfo: workspace.contactInfo,
  });
}


export default function DataManagementPage() {
  const scrapMap = useAppSelector(selectScrapMap);

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
            {Object.keys(scrapMap).length} Scraps
          </Segment>
          <Segment>
            <Button icon
                    color='green'
                    title='Download Workspace'
                    onClick={() => {downloadWorkspace()}}>
              <Icon name='download' />
            </Button>
            <Button icon
                    color='red'
                    title='Clear Workspace'
                    onClick={() => {clearWorkspace()}}>
              <Icon name='file text outline' />
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
