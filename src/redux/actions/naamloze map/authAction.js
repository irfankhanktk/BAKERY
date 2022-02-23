export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCES";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCES";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
const BASE_URL = "192.168.1.1:4000";

export const registerUser = (authData) => {
  const { fullName, email, password } = authData;

  return async (dispatch) => {
    // logic to make a post to REGISTER the user
    const result = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const resultData = await result.json();
    console.log(resultData);

    if (resultData.success) {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: REGISTER_USER_FAIL,
      });
    }

    return resultData;
  };
};

export const loginUser = (authdata) => {
  const { email, password } = authdata;

  return async (dispatch) => {
    // logic to make a post to login the server
    const result = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resultData = await result.json();
    console.log(resultData);

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: 1,
    });
  };
};
