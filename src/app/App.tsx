
import TextEditor from '../pages/textEditor/TextEditor';
import Tabs from '../widgets/tabs/Tabs';
import { useState } from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import Home from '../pages/home/Home';
import Users from '../pages/Users';
import { I18nextProvider } from "react-i18next";
import i18next from "../i18n/i18n";
import TabBar from '../widgets/tabs/TabBar';
import Survey from '../pages/surveys/Survey';
import CreateSurveyMain from '../pages/surveys/CreateSurveyMain';
import SurveyTestPass from '../pages/surveys/SurveyTestPass';

function App() {
  const [isOpenTab, setIsOpenTab] = useState(false)
  const closeOpenTab = () => {
    setIsOpenTab(!isOpenTab)
  }
  return (
    <I18nextProvider i18n={i18next}>

      <div className='flex h-full'>
        <div className={'w-50 ' + (!isOpenTab && "hidden")}>
          <Tabs closeOpenTab={closeOpenTab} />
        </div>
        <div className='grow flex flex-col h-full'>
          <div>
            <TabBar closeOpenTab={closeOpenTab} isOpenTab={isOpenTab}></TabBar>
          </div>
          <div className='bg-[#F9F9FA] flex flex-col min-h-0 h-full'>
            <Routes>
              <Route path="/surveys" element={<TextEditor />} />
              <Route path="/something" element={<Users />} />
              <Route path='/surveys-tests' element={<Survey />} />
              <Route path='/surveys2' element={<CreateSurveyMain />} />
              <Route path="/" element={<Home />} />
              <Route path='/surveys-tests/:id' element={<SurveyTestPass/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </I18nextProvider>
  )
}

export default App
