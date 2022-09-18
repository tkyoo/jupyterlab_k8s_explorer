import json

from jupyter_server.base.handlers import APIHandler
import tornado

from .k8s import K8sManager

k8s_manager = K8sManager()

class ListNamespaceHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        self.finish(json.dumps(k8s_manager.get_namespace_list(), default=str))

class GetNamespaceHanlder(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        name = self.get_argument("name")
        self.finish(json.dumps(k8s_manager.read_namespace(name), default=str))

class ListObjectHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        object_name = self.get_argument("object_name")
        self.finish(json.dumps(k8s_manager.list_object_api(object_name), default=str))

class GetObjectHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        name = self.get_argument("name")
        object_name = self.get_argument("object_name")
        self.finish(json.dumps(k8s_manager.read_namespaced_object(object_name, name), default=str))
