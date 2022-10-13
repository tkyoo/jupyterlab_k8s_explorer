import { URLExt } from '@jupyterlab/coreutils';

import { ServerConnection } from '@jupyterlab/services';

/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
async function requestAPI<T>(
  endPoint = '',
  request: RequestInit = {}
): Promise<T> {
  // Make request to Jupyter API
  const settings = ServerConnection.makeSettings();
  const requestUrl = URLExt.join(
    settings.baseUrl,
    'jupyterlab-k8s-explorer', // API Namespace
    endPoint
  );

  let response: Response;
  try {
    response = await ServerConnection.makeRequest(
      requestUrl,
      request,
      settings
    );
  } catch (error) {
    throw new ServerConnection.NetworkError(error);
  }

  let data: any = await response.text();

  if (data.length > 0) {
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log('Not a JSON response body.', response);
    }
  }

  if (!response.ok) {
    throw new ServerConnection.ResponseError(response, data.message || data);
  }

  return data;
}

async function getObjectList(objectName: string): Promise<any> {
  const data = await requestAPI<any>(
    'k8s/get_object_list?' +
      new URLSearchParams({
        object_name: objectName
      })
  );

  console.log(data);
  return data;
}

async function getGlobalObjectList(objectName: string): Promise<any> {
  const data = await requestAPI<any>(
    'k8s/get_global_object_list?' +
      new URLSearchParams({
        object_name: objectName
      })
  );

  console.log(data);
  return data;
}

async function readObject(
  objectName: string,
  namespace: string,
  name: string
): Promise<any[]> {
  const data = await requestAPI<any[]>(
    'k8s/read_object?' +
      new URLSearchParams({
        name: name,
        object_name: objectName,
        namespace: namespace
      })
  );

  console.log(data);
  return data;
}

async function readGlobalObject(
  objectName: string,
  name: string
): Promise<any[]> {
  const data = await requestAPI<any[]>(
    'k8s/read_global_object?' +
      new URLSearchParams({
        name: name,
        object_name: objectName
      })
  );

  console.log(data);
  return data;
}

export {
  requestAPI,
  getObjectList,
  getGlobalObjectList,
  readObject,
  readGlobalObject
};
