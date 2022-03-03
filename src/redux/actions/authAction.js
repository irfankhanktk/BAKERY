export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

const BASE_URL = "https://order-node-server.herokuapp.com";
// const BASE_URL = "http:/192.168.43.68:4000";

export const registerUser = (authData) => {
  const { fullName, address, postalCode, residence, email, password } =
    authData;

  return async (dispatch) => {
    // logic to make a post to REGISTER the user
    const result = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        address,
        postalCode,
        residence,
        email,
        password,
      }),
    });

    const resultData = await result.json();

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

export const loginUser = (authData) => {
  const { email, password } = authData;


  return async (dispatch) => {
    console.log("url",`${BASE_URL}/api/users/login`);
    // logic to make a post to LOGIN the user
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
    console.log("resultData------111>",resultData);

    // check the resultData (success true or false)
    if (resultData.success) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: LOGIN_USER_FAIL,
      });
    }

    return resultData;
  };
};
