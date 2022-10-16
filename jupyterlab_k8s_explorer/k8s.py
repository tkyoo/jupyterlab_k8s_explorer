import json
import os
from typing import Dict, List

from kubernetes import client, config
import urllib3
import yaml


class K8sManager(object):
    def __init__(self):
        self.api_object = {}
        self.api_client = None

        self._set_api_client()

    def _initialize(self, context=None):
        if not self.api_client:
            try:
                config.load_config(context=context)
            except Exception as e:
                print(e)

        self.api_object = {
            "app": client.AppsV1Api(self.api_client),
            "batch": client.BatchV1Api(self.api_client),
            "core": client.CoreV1Api(self.api_client),
            "scheduling": client.SchedulingV1Api(self.api_client),
            "storage": client.StorageV1Api(self.api_client),
            "rbac_authorization": client.RbacAuthorizationV1Api(self.api_client)
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

    def _set_api_client(self):
        context = None

        try:
            user_settings = self._load_userconfig()

            if user_settings:
                config_path = user_settings.get("kubeconfig_path", None)
                context = user_settings.get("context", None)

                if config_path:
                    config_dict = yaml.load(open(config_path, "r"), Loader=yaml.Loader)
                    self.api_client = config.new_client_from_config_dict(config_dict, context=context)

        except Exception as e:
            print(e)
        
        self._initialize(context)

    def _load_userconfig(self):
        try:
            home_path = os.environ.get("HOME", None)
            user_settings_path= ".jupyter/lab/user-settings/jupyterlab_k8s_explorer/plugin.jupyterlab-settings"
            user_settings_file_path = "/".join([home_path, user_settings_path])

            if os.path.isfile(user_settings_file_path):
                return json.load(open(user_settings_file_path, "r"))
        except Exception as e:
            print(e)
        
        return None

    def get_contexts(self):
        try:
            user_settings = self._load_userconfig()

            config_path = None

            if user_settings:
                config_path = user_settings.get("kubeconfig_path", None)

            return config.list_kube_config_contexts(config_path)
        except:
            return None

    def list_object_api(self, object_name):
        method_name = f"list_{object_name}_for_all_namespaces"

        result = None
        response = None

        for client in self.api_object.values():
            if method_name in dir(client):
                try:
                    response = getattr(client, method_name)()
                    break
                except urllib3.exceptions.MaxRetryError as e:
                    response = None
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
                try:
                    response = getattr(client, method_name)()
                    break
                except urllib3.exceptions.MaxRetryError as e:
                    response = None
                    break

        if response:
            result = response.to_dict()
            self._clean_null_key(result)

        return result

    def get_pod_log(self, name, namespace, container=None, length=100):
        core = self.api_object["core"]

        return core.read_namespaced_pod_log(
            name, namespace, container=container, tail_lines=length
        )

    def read_global_object(self, object_name, name):
        method_name = f"read_{object_name}"

        result = None
        response = None
        for client in self.api_object.values():
            if method_name in dir(client):
                try:
                    response = getattr(client, method_name)(name=name)
                    break
                except urllib3.exceptions.MaxRetryError as e:
                    response = None
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
                try:
                    response = getattr(client, method_name)(namespace=namespace, name=name)
                    break
                except urllib3.exceptions.MaxRetryError as e:
                    response = None
                    break

        if response:
            result = response.to_dict()
            self._clean_null_key(result)

        return result
