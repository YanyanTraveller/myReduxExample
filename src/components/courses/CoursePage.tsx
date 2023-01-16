import React from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseAcrions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import * as authorAction from "../../redux/actions/authorsAction";

export interface courseProps {
  title: string;
  id?: number;
  authorName?: string;
}

interface CoursePageState {
  course: courseProps;
}

interface CoursePageProps {
  dispatch: any;
  actions: any;
  courses: courseProps[];
  authors: [];
}

class CoursePage extends React.Component<CoursePageProps, CoursePageState> {
  componentDidMount(): void {
    const { actions, authors, courses } = this.props;
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
  }

  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: "",
      },
    };
  }

  render() {
    return (
      <>
        <h1>courses</h1>
        <h2>courses title</h2>
        <CourseList courses={this.props.courses} />
        <div>
          {this.props.courses.map((course, index) => (
            <div key={index}>{course.title}</div>
          ))}
        </div>
      </>
    );
  }
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
    authors: 
      state.authors
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

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
