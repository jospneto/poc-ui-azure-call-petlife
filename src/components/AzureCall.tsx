import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import { fromFlatCommunicationIdentifier, useAzureCommunicationCallAdapter, CallComposite, ChatComposite, useAzureCommunicationChatAdapter } from "@azure/communication-react";
import { useMemo } from "react";
import { initializeIcons } from '@fluentui/react';
import { useAzureCommunicationServiceArgs } from "../hooks";

initializeIcons();

export const AzureCall: React.FC = () => {
  const { userId, token, displayName, groupId } =
    useAzureCommunicationServiceArgs();

  const credential = useMemo(() => {
    try {
      return new AzureCommunicationTokenCredential(token);
    } catch {
      console.error('Failed to construct token credential');
      return undefined;
    }
  }, [token]);


  const callAdapterArgs = useMemo(
    () => ({
      userId: fromFlatCommunicationIdentifier(
        userId
      ) as CommunicationUserIdentifier,
      displayName,
      credential,
      locator: {
        groupId,
      },
    }),
    [userId, displayName, credential, groupId]
  );
  const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);

  if (!!callAdapter) {
    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{
          border: 'solid 0.125rem olive',
          margin: '0.5rem',
          width: '50vw',
        }}>
          <CallComposite adapter={callAdapter} />
        </div>
      </div>
    );
  }
  
  if (credential === undefined) {
    return (
      <h3>Failed to construct credential. Provided token is malformed.</h3>
    );
  }

  return <h3>Initializing...</h3>;
}


