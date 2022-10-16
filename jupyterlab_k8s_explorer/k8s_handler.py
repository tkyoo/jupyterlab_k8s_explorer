import json

from jupyter_server.base.handlers import APIHandler
import tornado

from .k8s import K8sManager

class ListObjectHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        object_name = self.get_argument("object_name")

        k8s_manager = K8sManager()
        self.finish(json.dumps(k8s_manager.list_object_api(object_name), default=str))

class ListGlobalObjectHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        object_name = self.get_argument("object_name")

        k8s_manager = K8sManager()
        self.finish(json.dumps(k8s_manager.list_global_object(object_name), default=str))

class GetContextHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        k8s_manager = K8sManager()
        self.finish(json.dumps(k8s_manager.get_contexts(), default=str))

class GetObjectHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        name = self.get_argument("name")
        object_name = self.get_argument("object_name")
        namespace = self.get_argument("namespace")

        k8s_manager = K8sManager()
        self.finish(json.dumps(k8s_manager.read_namespaced_object(object_name, namespace, name), default=str))

class GetGlobalObjectHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        name = self.get_argument("name")
        object_name = self.get_argument("object_name")

        k8s_manager = K8sManager()
        self.finish(json.dumps(k8s_manager.read_global_object(object_name, name), default=str))
