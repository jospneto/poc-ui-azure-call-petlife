import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import { CallComposite, fromFlatCommunicationIdentifier, useAzureCommunicationCallAdapter, COMPOSITE_LOCALE_PT_BR } from "@azure/communication-react";
import { useEffect, useMemo, useState } from "react";
import { initializeIcons } from '@fluentui/react';
import { useAzureCommunicationServiceArgs } from "../hooks";
import { lightTheme } from './theme';
import "./style.css";

initializeIcons();
const logo = `${window.location.origin}/logo.png` 

export const AzureCall: React.FC = () => {
  const { userId, token, displayName } =
    useAzureCommunicationServiceArgs();

  const credential = useMemo(() => {
    try {
      return new AzureCommunicationTokenCredential(token);
    } catch {
      console.error('Failed to construct token credential');
      return undefined;
    }
  }, [token]);

  const TEAMS_LINK = 'https://teams.microsoft.com/l/meetup-join/19:meeting_YThiMDRlNTktYjc2Ny00ZTdjLWJmZjItMWY0Mjc5NzMxNjU5@thread.v2/0?context=%7B%22Tid%22:%22779028e7-c4cc-45e4-8080-cd64e255aafc%22,%22Oid%22:%22d21d8b8d-75bd-4eb4-bafe-58b4708a1ccd%22%7D'

  const callAdapterArgs = useMemo(
    () => ({
      userId: fromFlatCommunicationIdentifier(
        userId
      ) as CommunicationUserIdentifier,
      displayName,
      credential,
      locator: {
        meetingLink: TEAMS_LINK
      },
    }),
    [userId, displayName, credential]
  );

  const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      {
        callAdapter ? 
          <div style={{
            width: '100%',
          }}>
            <img src={logo} style={{
              position: 'absolute',
              top: '14%',
              left: '47%',
              zIndex: 9999
            }} width="100px" height="100px" alt='logo' />
            <CallComposite fluentTheme={lightTheme} locale={COMPOSITE_LOCALE_PT_BR} adapter={callAdapter} />
          </div> : <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: "center",
              justifyContent: "center",
              height: '100%',
              width: '100%',
              gap: '24px'
            }}>
            <img src={logo} width="200px" height="200px" alt='logo' />
            <div style={{
              border: '6px solid #f3f3f3',
              borderTop: '6px solid #4AB7B6',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
      }
    </div>
  );

}




