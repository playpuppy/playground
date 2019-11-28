import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header/Header';
import Version from './components/Version/Version';
import PuppyScreen from './components/PuppyScreen/PuppyScreen';
import Editor from './components/Editor/Editor';
import Course from './components/Course/Course';
import { QueryParams } from './index';
import {
  fetchCourses,
  Courses,
  CourseShape,
  fetchContent,
  fetchSample,
  fetchSetting,
} from './logic/course';
import { PuppyOS, PuppyVM } from '@playpuppy/puppy2d';
import { play as puppyplay, fullscreen, resize } from './logic/puppy';
import {
  onChange,
  editorDidMount,
  fontMinus,
  fontPlus,
  CodeEditor,
} from './logic/editor';
import {
  openSetting,
  closeSetting as clSetting,
  initSetting,
} from './logic/setting';

type AppProps = { qs: QueryParams; hash: string };

const App: React.FC<AppProps> = (props: AppProps) => {
  const coursePath = props.qs.course ? props.qs.course : 'LIVE2019';
  const page = props.hash !== '' ? parseInt(props.hash.substr(1)) : 0;
  const [courses, setCourses] = useState({} as Courses);
  const [isShowVersion, setIsShowVersion] = useState(false);
  const [isCourseVisible, setIsCourseVisible] = useState(false);
  const [course, setCourse] = useState({ title: '', list: [] } as CourseShape);
  const [courseContent, setCourseContent] = useState('');
  const [puppy, setPuppy] = useState(null as PuppyVM | null);
  const [source, setSource] = useState('');
  const [editorTheme, setEditorTheme] = useState('vs');
  const [editorFontSize, setEditorFontSize] = useState(24);
  const [codeEditor, setCodeEditor] = useState(null as CodeEditor | null);
  const [decos, setDecos] = useState([] as string[]);
  const [isSettingOpened, setIsSettingOpened] = useState(false);
  const [_setting, setSetting] = useState({} as JSON);
  const [lang, setLang] = useState('python');

  const play = (puppy: PuppyVM | null) => (source: string) => () => {
    if (puppyplay(puppy)(source)()) {
      setEditorTheme('vs');
    } else {
      setEditorTheme('error');
    }
  };

  const closeSetting = clSetting(
    setIsSettingOpened,
    source,
    setSource,
    setSetting,
    setLang
  );

  useEffect(() => {
    fetchCourses(setCourses);
    const puppyElement = document.getElementById('puppy-screen');
    if (puppyElement) {
      const puppyOS = new PuppyOS();
      const puppy = puppyOS.newPuppyVM(puppyElement);
      // puppy.addEventListener('error', setLog);
      // puppy.addEventListener('warning', setLog);
      // puppy.addEventListener('info', setLog);
      setPuppy(puppy);
    }
    initSetting(setSetting);
  }, []);
  return (
    <div className="App">
      <Container className="container">
        <Header
          courses={courses}
          setIsShowVersion={setIsShowVersion}
          isSettingOpened={isSettingOpened}
          openSetting={openSetting(
            setIsSettingOpened,
            source,
            setSource,
            setLang
          )}
          closeSetting={closeSetting}
        />
        <Version setShow={setIsShowVersion} show={isShowVersion} />
        <Row id="main-row">
          <Col id="left-col" xs={6}>
            <Course
              course={course}
              coursePath={coursePath}
              page={page}
              content={courseContent}
              visible={isCourseVisible}
              play={play(puppy)}
              fetchContent={fetchContent(setCourseContent)}
              fetchSample={fetchSample(setSource)}
              fetchSetting={fetchSetting(setCourse)}
              closeSetting={closeSetting}
            />
            <PuppyScreen
              isCourseVisible={isCourseVisible}
              setIsCourseVisible={setIsCourseVisible}
              play={play(puppy)(source)}
              fullscreen={fullscreen(puppy)}
              setSize={resize(puppy)}
            />
          </Col>
          <Col id="right-col" xs={6}>
            <Editor
              fontSize={editorFontSize}
              theme={editorTheme}
              source={source}
              lang={lang}
              onChange={onChange(codeEditor, setSource, decos, setDecos)}
              editorDidMount={editorDidMount(setCodeEditor)}
              fontPlus={fontPlus(editorFontSize, setEditorFontSize)}
              fontMinus={fontMinus(editorFontSize, setEditorFontSize)}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;