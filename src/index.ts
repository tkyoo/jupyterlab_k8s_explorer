import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_k8s_explorer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_k8s_explorer:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_k8s_explorer is activated!');
  }
};

export default plugin;
