import React from 'react';
import { Chat } from '../Common';
import { UseAction } from '@/Notification/components/types';

export const PersonalPane: React.FC<{
  className?: string;
  useAction: UseAction;
}> = ({ useAction }) => <Chat useAction={useAction} />;
