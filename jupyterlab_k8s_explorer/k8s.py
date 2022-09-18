from kubernetes import client, config


class K8sManager(object):
    def __init__(self):
        self.load_config()

        self.api_object = {
            "app": client.AppsV1Api(),
            "batch": client.BatchV1Api(),
            "core": client.CoreV1Api(),
        }

    def load_config(self):
        config.load_config()

    def list_object_api(self, object_name):
        method_name = f"list_{object_name}_for_all_namespaces"

        result = None
        for _, client in self.api_object:
            if method_name in dir(client):
                result = getattr(client, method_name)()
                break

        return result.to_dict()

    def get_namespace_list(self):
        core = self.api_object["core"]

        response = core.list_namespace()

        result = []

        for each in response.items:
            result.append(each.to_dict())

        return result

    def get_pod_log(self, name, namespace, container=None, length=100):
        core = self.get_core_api()

        return core.read_namespaced_pod_log(
            name, namespace, container=container, tail_lines=length
        )

    def read_namespace(self, name):
        return self.api_object["core"].read_namespace(name).to_dict()

    def read_namespaced_object(self, object_name, name):
        method_name = f"read_namespaced_{object_name}"

        result = None
        for _, client in self.api_object:
            if method_name in dir(client):
                result = getattr(client, method_name)(name)
                break
        
        return result.to_dict()
