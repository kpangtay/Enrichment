import {
  CREATE as CREATE_STUDENT,
  UPDATE as UPDATE_STUDENT,
} from './students.reducer';
/* -----------------    ACTION TYPES    ------------------ */
export const SET_CAMPUSES = 'SET_CAMPUSES';
export const CREATE = 'CREATE_CAMPUS';
export const UPDATE = 'UPDATE_CAMPUS';
export const REMOVE = 'REMOVE_CAMPUS';

/* ------------    ACTION CREATORS      ------------------ */
const setCampuses = campuses => ({ type: SET_CAMPUSES, campuses });
const create = campus => ({ type: CREATE, campus });
const update = campus => ({ type: UPDATE, campus });
const remove = id => ({ type: REMOVE, id });

/* ------------         Initial State         ------------------ */
const initialState = {
  list: [],
  isFetching: false,
};

/* ------------         REDUCER         ------------------ */

export default function campusesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CAMPUSES:
      return { list: action.campuses, isFetching: true };

    case CREATE:
      return { list: [...state.list, action.campus], isFetching: true };

    case CREATE_STUDENT:
      return { list: [...state.list, action.student], isFetching: true };

    case UPDATE:
      return {
        list: state.list.map(
          campus => (action.campus.id === campus.id ? action.campus : campus)
        ),
        isFetching: true,
      };

    case UPDATE_STUDENT:
      return {
        list: state.list.map(campus => {
          return action.student.campuId === campus.id ? action.student : campus;
        }),
        isFetching: true,
      };

    case REMOVE:
      return {
        list: state.list.filter(campus => campus.id !== action.id),
        isFetching: true,
      };

    default:
      return state;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchCampuses = () => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data } = await axios.get('/api/campuses');
      const action = setCampuses(data);
      dispatch(action);
    } catch (err) {
      console.error(`Fetching campus unsuccessful`, err);
    }
  };
};

export const addCampus = (campus, ownProps) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data } = await axios.post('/api/campuses', campus);
      dispatch(create(data));
      ownProps.history.push(`/campuses/${data.id}`);
    } catch (err) {
      console.error(`Creating campus : ${data} unsuccessful`, err);
    }
  };
};

export const updateCampus = (id, campus, ownProps) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data } = await axios.put(`/api/campuses/${id}`, campus);
      dispatch(update(data));
      ownProps.history.push(`/campuses/${data.id}`);
    } catch (err) {
      console.error(`Updating campus: ${id} unsuccessful`, err);
    }
  };
};

export const removeCampus = id => {
  return async (dispatch, getState, { axios }) => {
    try {
      await axios.delete(`/api/campuses/${id}`);
      dispatch(remove(id));
    } catch (err) {
      console.error(`Removing campus: ${id} unsuccessful`, err);
    }
  };
};
