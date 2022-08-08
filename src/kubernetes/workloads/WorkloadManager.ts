import { requestAPI } from "../../handler";

type NamespaceObject = {
    metadata: {
        name: string
    }
}

class KubernetesWorkload {
    constructor() {    
    }

    async getNamespace(): Promise<NamespaceObject[]> {
        const data = await requestAPI<NamespaceObject[]>("k8s/get_namespace_list");

        return data;
        // .then(data => {
        //   console.log(data);
        // })
        // .catch(reason => {
        //   console.error(
        //     `The jupyterlab_k8s_explorer server extension appears to be missing.\n${reason}`
        //   );
        // });
    }
}

export {NamespaceObject, KubernetesWorkload};
