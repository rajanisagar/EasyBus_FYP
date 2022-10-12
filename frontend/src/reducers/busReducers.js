import { BUS_CATEGORY_LIST_FAIL, BUS_CATEGORY_LIST_REQUEST, BUS_CATEGORY_LIST_SUCCESS, BUS_CREATE_FAIL, BUS_CREATE_REQUEST, BUS_CREATE_RESET, BUS_CREATE_SUCCESS, BUS_DELETE_FAIL, BUS_DELETE_REQUEST, BUS_DELETE_RESET, BUS_DELETE_SUCCESS, BUS_DETAILS_FAIL, BUS_DETAILS_REQUEST, BUS_DETAILS_SUCCESS, BUS_LIST_FAIL, BUS_LIST_REQUEST, BUS_LIST_SUCCESS, BUS_REVIEW_CREATE_FAIL, BUS_REVIEW_CREATE_REQUEST, BUS_REVIEW_CREATE_RESET, BUS_REVIEW_CREATE_SUCCESS, BUS_UPDATE_FAIL, BUS_UPDATE_REQUEST, BUS_UPDATE_RESET, BUS_UPDATE_SUCCESS } from "../constants/busConstants";
import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/userConstants";

export const busListReducer = (state = {buses: []}, action) => {
    switch(action.type){
        case BUS_LIST_REQUEST:
            return{loading: true};
        case BUS_LIST_SUCCESS:
            return {loading: false, buses: action.payload };
        case BUS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}; 

export const busCategoryListReducer = (state = {buses: []}, action) => {
  switch(action.type){
      case BUS_CATEGORY_LIST_REQUEST:
          return{loading: true};
      case BUS_CATEGORY_LIST_SUCCESS:
          return {loading: false, categories: action.payload };
      case BUS_CATEGORY_LIST_FAIL:
          return {loading: false, error: action.payload};
      default:
          return state;
  }
}; 


export  const busDetailsReducer = (state = {loading:true}, action) =>{
    switch(action.type){
        case BUS_DETAILS_REQUEST:
            return {loading: true}
        case BUS_DETAILS_SUCCESS:
            return {loading: false, bus: action.payload};
        case BUS_DETAILS_FAIL:
             return {loading: false, error: action.payload};

        default:
            return state

    }
}


  export const busCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case BUS_CREATE_REQUEST:
        return { loading: true };
      case BUS_CREATE_SUCCESS:
        return { loading: false, success: true, bus: action.payload };
      case BUS_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case BUS_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const busUpdateReducer = (state = {}, action) => {
    switch(action.type){
      case BUS_UPDATE_REQUEST:
        return {loading: true};
      case BUS_UPDATE_SUCCESS:
        return {loading: false, success: true}
      case BUS_UPDATE_FAIL:
        return {loading: false, error: action.payload}
      case BUS_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  }

  export const busDeleteReducer = (state = {}, action) =>{
    switch(action.type){
      case BUS_DELETE_REQUEST:
        return {loading: true};
      case BUS_DELETE_SUCCESS:
        return {loading: false, success: true};
      case BUS_DELETE_FAIL:
        return {loading: false, error: action.payload};
        case BUS_DELETE_RESET:
          return {}
      default:
        return state;
    }
  }

  export const busReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case BUS_REVIEW_CREATE_REQUEST:
        return { loading: true };
      case BUS_REVIEW_CREATE_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case BUS_REVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case BUS_REVIEW_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
