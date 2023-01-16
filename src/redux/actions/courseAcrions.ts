import { courseProps } from "../../components/courses/CoursePage";
import * as courseApi from "../../api/courseApi";

export interface actionProps {
  type: string;
  courses: courseProps[];
  course: courseProps;
}

export function createCourse(course: courseProps) {
  return { type: "CREATE_COURSE", course };
}

export function loadCourseSuccess(courses: courseProps[]) {
  return { type: "LOAD_COURSES_SUCCESS", courses };
}

export function createCourseSuccess(course) {
  return { type: 'CREATE_COURSE_SUCCESS', course };
}

export function updateCourseSuccess(course) {
  return { type: 'UPDATE_COURSE_SUCCESS', course };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then(courses=>{
        dispatch(loadCourseSuccess(courses));
      })
      .catch((err) => {
        throw err;
      });
  };
}


export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}