/**
 * Application commmon request service, which will
 * handle the errors and response in success case.
 * This has been configured with dispatching error
 * messages and responsible for starting and stopping
 * the loader when making a request.
 */

import axios from "axios";
import { call, put } from "redux-saga/effects";
import { isLoading, isMessage } from "./actions";

/**
 * request service wrapped with axios
 * @param params
 */
export function* request(params: any) {
  const { apiOptions, loadingText, onSuccess } = params;
  /**
   * Start loading when a request is made to the server
   */
  yield put(isLoading(true, loadingText || "Loading..."));

  try {
    const response = yield call(axios, apiOptions);
    /**
     * When a request complete, give back the response to
     * the caller in onSuccess callback.
     */
    yield call(onSuccess, response);
  } catch (error) {
    /**
     * Here we can handle all sorts of errors being sent
     * from server and dispatch them to the reducer to
     * manage it in state for use on the UI. below is just
     * a sample error when the requests breaks or there occur
     * some sort of API error.
     */
    const message = {
      color: "red",
      message: "Something went wrong",
      type: "error"
    };
    /**
     * Dispatch the message being generated by receiving erros
     * from server api.
     */
    yield put(isMessage(message));
  } finally {
    /**
     * When request is completed we will stop
     * the loader anyway by issuing a stop loader action.
     */
    yield put(isLoading(false));
  }
}
