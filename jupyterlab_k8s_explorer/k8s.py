from typing import Dict, List

from kubernetes import client, config


class K8sManager(object):
    def __init__(self):
        self.load_config()

        self.api_object = {
            "app": client.AppsV1Api(),
            "batch": client.BatchV1Api(),
            "core": client.CoreV1Api(),
            "scheduling": client.SchedulingV1Api(),
            "storage": client.StorageV1Api(),
            "rbac_authorization": client.RbacAuthorizationV1Api()
        }

    def _clean_null_key(self, dictionary: Dict):
        def _iter_list(array):
            for value in array:
                if isinstance(value, dict):
                    self._clean_null_key(value)
                elif isinstance(value, list):
                    _iter_list(value)

        key_list = list(dictionary.keys())

        for key in key_list:
            value = dictionary[key]
            
            if isinstance(value, dict):
                self._clean_null_key(value)
            elif isinstance(value, list):
                _iter_list(value)
            elif value is None:
                del dictionary[key]

    def load_config(self):
        config.load_config()

    def list_object_api(self, object_name):
        method_name = f"list_{object_name}_for_all_namespaces"

        result = None
        response = None

        for client in self.api_object.values():
            if method_name in dir(client):
                response = getattr(client, method_name)()
                break
        
        if response:
            result = response.to_dict()
            self._clean_null_key(result)
            

        return result

    def list_global_object(self, object_name):
        method_name = f"list_{object_name}"

        result = None
        response = None
        for client in self.api_object.values():
            if method_name in dir(client):
                response = getattr(client, method_name)()
                break
        
        if response:
            result = response.to_dict()
            self._clean_null_key(result)

        return result

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
        result = None
        response = None

        response = self.api_object["core"].read_namespace(name)

        if response:
            result = response.to_dict()
            self._clean_null_key(result)

        return result

    def read_global_object(self, object_name, name):
        method_name = f"read_{object_name}"

        result = None
        response = None
        for client in self.api_object.values():
            if method_name in dir(client):
                response = getattr(client, method_name)(name=name)
                break

        if response:
            result = response.to_dict()
            self._clean_null_key(result)

        return result

    def read_namespaced_object(self, object_name, namespace, name):
        method_name = f"read_namespaced_{object_name}"

        result = None
        response = None
        for client in self.api_object.values():
            if method_name in dir(client):
                response = getattr(client, method_name)(namespace=namespace, name=name)
                break

        if response:
            result = response.to_dict()
            self._clean_null_key(result)

        return result
