import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseAcrions";
import { bindActionCreators } from "redux";
import * as authorAction from "../../redux/actions/authorsAction";
import CourseForm from "./CourseForm";

export interface courseProps {
  title: string;
  id?: number;
  authorName?: string;
}

interface ManagedCoursePageState {
  course: courseProps;
}

interface ManagedCoursePageProps {
  dispatch: any;
  actions: any;
  courses: courseProps[];
  authors: [];
}

function ManagedCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({...props.course});
  const [error, setError] = useState({});

  useEffect(() => {
    const { actions} = props;
    if (courses.length === 0) {
      actions.loadCourses().catch((err) => {
        alert(err);
      });
    }
    if (authors.length === 0) {
      /// adding load authors code
      actions.loadAuthors().catch((err) => {
        alert(err);
      });
    }
  }, []);

  function handleOnChange(event){
    const [name, value] = event.target;
    setCourse(prevState => ({...prevState,[name]: name==='authorId'?parseInt(value, 10):value}));
  }

  function handleOnSave(event){
    event.preventDefault();
  }

  return (
    <>
      <h1>Manage courses</h1>
      <CourseForm course={course} errors={error} authors={authors} onChange={handleOnChange} onSave={handleOnSave}/>
    </>
  );
}

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find(
                (author) => author.id === course.authorId
              )?.name,
            };
          }),
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagedCoursePage);
