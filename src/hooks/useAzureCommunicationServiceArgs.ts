import { ChatClient } from "@azure/communication-chat";
import { fromFlatCommunicationIdentifier } from "@azure/communication-react";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  AzureCommunicationTokenCredential,
} from '@azure/communication-common';
import { TOKEN, USER_ID } from "../constants/azure";

  export function useAzureCommunicationServiceArgs(): {
    endpointUrl: string;
    userId: string;
    token: string;
    displayName: string;
    groupId: string;
    threadId: string;
  } {
    const [threadId, setThreadId] = useState('');
    useEffect(() => {
      (async () => {
        const client = new ChatClient(
          'https://petlife-voip-dev.unitedstates.communication.azure.com/',
          new AzureCommunicationTokenCredential(TOKEN)
        );
        const { chatThread } = await client.createChatThread(
          {
            topic: 'Composites Quickstarts',
          },
          {
            participants: [
              {
                id: fromFlatCommunicationIdentifier(USER_ID),
                displayName:"José Neto",
              },
              {
                id: fromFlatCommunicationIdentifier('8:acs:0ad063f2-d549-4baf-8a2e-dc4ad95e02c4_0000001c-ebdc-d531-6763-563a0d008bd7'),
                displayName:'Lucas'
              }
            ],
          }
        );
        setThreadId(chatThread?.id ?? '');
      })();
    }, []);

    const groupId = useRef(uuidv4());
  
    return {
      endpointUrl: 'https://petlife-voip-dev.unitedstates.communication.azure.com/',
      userId: USER_ID,
      token: TOKEN,
      displayName: 'José Neto',
      groupId: groupId.current,
      threadId,
    };
  }