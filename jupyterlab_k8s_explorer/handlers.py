import json

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado

from .k8s_handler import GetNamespaceHandler

class RouteHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        self.finish(
            json.dumps(
                {"data": "This is /jupyterlab_k8s_explorer/get_example endpoint!"}
            )
        )


def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    # handlers = [(route_pattern, RouteHandler)]
    handlers = [
        (url_path_join(base_url, "jupyterlab-k8s-explorer", "get_example"), RouteHandler),
        (url_path_join(base_url, "jupyterlab-k8s-explorer", "k8s/get_namespace_list"), GetNamespaceHandler)
    ]
    web_app.add_handlers(host_pattern, handlers)
