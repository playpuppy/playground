import React, { useEffect } from 'react';
import * as marked from 'marked';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import { CourseShape } from '../../modules/course';

import './Course.css';
import './github-markdown.css';

type CourseProps = {
  course: CourseShape;
  coursePath: string;
  page: number;
  content: string;
  visible: boolean;
  setCode: (code: string) => void;
  setContent: (content: string) => void;
  setCourse: (course: CourseShape) => void;
  fetchContent: (coursePath: string, path: string) => void;
  fetchSample: (coursePath: string, path: string) => void;
  fetchSetting: (coursePath: string) => void;
};

const Course: React.FC<CourseProps> = (props: CourseProps) => {
  useEffect(() => {
    if (props.course.list.length !== 0) {
      props.fetchContent(
        props.coursePath,
        props.course.list[props.page % props.course.list.length].path
      );
      props.fetchSample(
        props.coursePath,
        props.course.list[props.page % props.course.list.length].path
      );
    }
  }, [props.page, props.coursePath, props.course]);

  useEffect(() => {
    props.fetchSetting(props.coursePath);
  }, [props.course]);

  return (
    <div
      id="puppy-course"
      style={{ visibility: props.visible ? 'visible' : 'hidden' }}
    >
      <Card className="course-all">
        <Card.Header className="course-header">
          <Row>
            <Col className="card-header-left" xs={6}>
              {props.course.list &&
              props.course.list.length !== 0 &&
              props.page !== 0 ? (
                <a href={`#${props.page - 1}`}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  {` ${props.course.list[props.page - 1].title}`}
                </a>
              ) : null}
            </Col>
            <Col className="card-header-right" xs={6}>
              {props.course.list &&
              props.course.list.length !== 0 &&
              props.page !== props.course.list.length - 1 ? (
                <a href={`#${props.page + 1}`}>
                  {`${props.course.list[props.page + 1].title} `}
                  <FontAwesomeIcon icon={faChevronRight} />
                </a>
              ) : null}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="course-body">
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: marked(props.content),
            }}
          ></div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Course;
