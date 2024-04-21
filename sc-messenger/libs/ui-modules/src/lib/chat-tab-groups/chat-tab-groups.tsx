import styles from './chat-tab-groups.module.scss';
import {useState} from "react";
import {ChatTabGroupButtonActive, ChatTabGroupButtonDisactive} from "@messenger/ui";

/* eslint-disable-next-line */
export interface ChatTabGroupsProps {}

type Tab = {
  text: string;
  set: string;
}

export function ChatTabGroups(props: ChatTabGroupsProps) {
  const [tabs, setTabs] = useState<Tab[]>([
{text: 'All', set: 'all'},
{text: 'Personal', set: 'personal'},
{text: 'Groups', set: 'groups'},
{text: 'Bots', set: 'bots'},
  ]);
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
      <ul className="flex flex-wrap -mb-px">
        {
          tabs.map((tab:Tab, key: number) => {
            return (
              <li className="mr-2">
                {
                  (selectedTab === tab) ?
                    <button type={'button'} disabled={true} className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active "
                            aria-current="page">
                      {tab.text}
                    </button> :
                    <li className="mr-2">
                      <button type={'button'} onClick={() => setSelectedTab(tab)}
                              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ">
                        {tab.text}
                      </button>
                    </li>
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default ChatTabGroups;
