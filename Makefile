build:
	pip install -e .
	jupyter labextension develop . --overwrite
	jupyter server extension enable jupyterlab_k8s_explorer
	jlpm run build
