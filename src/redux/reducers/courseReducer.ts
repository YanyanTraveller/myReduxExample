import { courseProps } from "../../components/courses/CoursePage";
import { actionProps } from "../actions/courseAcrions";

export default function courseReducer(
  state: courseProps[] = [],
  action: actionProps
) {
  switch (action.type) {
    case "CREATE_COURSE":
      return [...state, { ...action.courses }];
    case 'CREATE_COURSE_SUCCESS':
      return [...state, { ...action.course }];
    case 'UPDATE_COURSE_SUCCESS':
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    case "LOAD_COURSES_SUCCESS":
      return action.courses;
    default:
      return state;
  }
}
