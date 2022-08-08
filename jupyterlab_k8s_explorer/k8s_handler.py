import json

from jupyter_server.base.handlers import APIHandler
import tornado

from .k8s import K8sManager

k8s_manager = K8sManager()

class GetNamespaceHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        self.finish(json.dumps(k8s_manager.get_namespace_list(), default=str))
