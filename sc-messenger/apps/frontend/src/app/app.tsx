// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ChatPage, MessagesListPage} from "@messenger/pages";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @nx/enforce-module-boundaries
import {AppModule} from "../../../agw/src/app/app.module";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MessagesListPage/>} />
        <Route path="/c/:uuid" element={<ChatPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
