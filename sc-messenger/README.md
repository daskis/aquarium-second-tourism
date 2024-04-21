### Frontend

> Если БД не стартует, удалите папки:
[datachat](datachat)
[datamsgs](datamsgs)
[dataprofile](dataprofile)
и попробуйте заново!

#### Create a new Layout
```bash
nx g @nx/react:component --project layouts
```
#### Create a new Page
```bash
nx g @nx/react:component --project pages
```
#### Create a new Component
Like navbar, footer, login card, delete modal alert and et.
```bash
nx g @nx/react:component --project ui-modules
```
#### Create a new UI Component
Like nav_link, cta_button, username_input and et.
```bash
nx g @nx/react:component --project ui
```

#### Create a new Prisma Client
```bash
nx generate prisma-generator
```

**Run all services:**

```bash
nx run-many --parallel --target=serve --projects=frontend,agw,chats,messages
```

**Chats**

```bash
prisma generate --schema="./libs/prisma-clients/chats/prisma/schema.prisma"
```

```bash
prisma db push --schema="./libs/prisma-clients/chats/prisma/schema.prisma"
```

**Messages**

```bash
prisma generate --schema="./libs/prisma-clients/messages/prisma/schema.prisma"
```

```bash
prisma db push --schema="./libs/prisma-clients/messages/prisma/schema.prisma"
```

**Profiles**

```bash
prisma generate --schema="./libs/prisma-clients/UserProfile/prisma/schema.prisma"
```

```bash
prisma db push --schema="./libs/prisma-clients/UserProfile/prisma/schema.prisma"
```




activity db:

model Activity {
id          Int        @id @default(autoincrement())
type        String     // "message", "update_profile", "create_post", etc.
createdAt   DateTime   @default(now())
user        User       @relation(fields: [userId], references: [id])
userId      Int
}



Certainly! I'll provide you with a React component for a chat room that fetches messages using pagination (take and skip) in the API request and supports loading more messages when swiping to the top of the message list. For this, we'll integrate the `react-swipeable-views` library to detect swipe gestures.

First, make sure you have `react-swipeable-views` installed:

```bash
npm install react-swipeable-views
```

Now, let's create the component:

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import MessageList from './MessageList';

const PAGE_SIZE = 10;

const ChatRoom: React.FC<{ chatId: number }> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMessages = useCallback(
    async (page: number) => {
      try {
        const response = await axios.get(`/api/messages/${chatId}`, {
          params: { page, pageSize: PAGE_SIZE },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
      }
    },
    [chatId]
  );

  const loadMoreMessages = async () => {
    const nextPage = currentPage + 1;
    const newMessages = await fetchMessages(nextPage);
    setMessages(prevMessages => [...prevMessages, ...newMessages]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    const initialFetch = async () => {
      const initialMessages = await fetchMessages(currentPage);
      setMessages(initialMessages);
    };
    initialFetch();
  }, [fetchMessages, currentPage]);

  const handleSwipeTop = () => {
    if (messages.length >= currentPage * PAGE_SIZE) {
      loadMoreMessages();
    }
  };

  return (
    <div>
      <h2>Chat Room {chatId}</h2>
      <SwipeableViews onSwipedTop={handleSwipeTop}>
        <MessageList messages={messages} />
      </SwipeableViews>
    </div>
  );
};

export default ChatRoom;
```

In this component, we define a `PAGE_SIZE` constant to determine how many messages to load per page. We use the `useState` hook to manage the `messages` array and the `currentPage` state. The `fetchMessages` function fetches messages based on the current page and the `loadMoreMessages` function loads additional messages when swiping to the top.

The `useEffect` hook initializes the component by fetching the initial set of messages when the component mounts.

The `handleSwipeTop` function is called when a swipe gesture is detected at the top of the `SwipeableViews` component. If there are more messages available to load, it triggers the `loadMoreMessages` function.

Please adapt this code to fit into your existing project structure and adjust it as needed for your specific use case.

Certainly! Designing the architecture of your React components for a messaging app involves structuring your UI components in a way that promotes reusability, modularity, and maintainability. Below is a simplified example of how you might structure your components to implement the features of a messaging app.

```plaintext
src/
├── components/
│   ├── Authentication/
│   │   ├── Login.tsx
│   │   ├── Registration.tsx
│   │   └── UserProfileSetup.tsx
│   ├── ChatList/
│   │   ├── ChatListItem.tsx
│   │   ├── ChatListHeader.tsx
│   │   └── ChatList.tsx
│   ├── ChatInterface/
│   │   ├── MessageInput.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── Attachments.tsx
│   │   ├── Emojis.tsx
│   │   ├── MessageReactions.tsx
│   │   └── ChatInterface.tsx
│   ├── RealTimeUpdates/
│   │   ├── PushNotifications.tsx
│   │   ├── UserOnlineStatus.tsx
│   │   └── RealTimeUpdatesProvider.tsx
│   ├── SearchFilters/
│   │   ├── SearchBar.tsx
│   │   └── FilterOptions.tsx
│   ├── SettingsProfile/
│   │   ├── UserSettings.tsx
│   │   ├── UserProfile.tsx
│   │   └── SettingsProfileMenu.tsx
│   ├── Notifications/
│   │   ├── NotificationCenter.tsx
│   │   ├── InAppNotifications.tsx
│   │   └── NotificationItem.tsx
│   ├── Calls/
│   │   ├── CallInterface.tsx
│   │   ├── CallHistory.tsx
│   │   └── CallLogItem.tsx
│   ├── ThemesCustomization/
│   │   ├── DarkModeSwitch.tsx
│   │   ├── BackgroundChooser.tsx
│   │   └── ThemesCustomization.tsx
│   ├── SwipeNavigation/
│   │   ├── SwipeableTabs.tsx
│   │   └── SwipeActions.tsx
│   └── ...
├── App.tsx
└── index.tsx
```

In this structure:

- Each major feature area has its own subdirectory under `components`.
- Components are organized into folders based on their functionality.
- Reusable components like `MessageBubble`, `MessageInput`, etc., can be used across multiple feature areas.
- For complex features like `ChatInterface`, further component breakdown can be done.
- `RealTimeUpdatesProvider` manages the real-time updates context for the app.

Remember that the actual structure might vary based on your project's needs and complexity. The key is to maintain a clear separation of concerns and promote reusability. Also, consider implementing state management solutions like Redux, MobX, or React Context for managing global states, especially for real-time updates and other shared data.

When building components, focus on keeping them small, single-responsibility, and easily testable. This architecture allows you to add and modify features without disrupting the entire application and facilitates collaboration among team members working on different aspects of the app.

