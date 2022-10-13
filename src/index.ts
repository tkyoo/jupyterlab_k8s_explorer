import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette,
  MainAreaWidget,
  WidgetTracker
} from '@jupyterlab/apputils';

import { requestAPI } from './handler';
// import APODWidget from './APODWidget';
import KuberenetesMainWidget from './kubernetes/Main';
// import { CounterWidget } from './kubernetes/Main.tsx.bak';

function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  restorer: ILayoutRestorer
): void {
  console.log('JupyterLab extension jupyterlab_k8s_explorer is activated!');

  requestAPI<any>('get_example')
    .then(data => {
      console.log(data);
    })
    .catch(reason => {
      console.error(
        `The jupyterlab_k8s_explorer server extension appears to be missing.\n${reason}`
      );
    });

  // let widget: MainAreaWidget<APODWidget>;
  let widget: MainAreaWidget<KuberenetesMainWidget>;

  // Add an application command
  const command = 'jupyterlab_k8s_explorer:open';
  app.commands.addCommand(command, {
    label: 'Random Astronomy Picture',
    execute: () => {
      if (!widget || widget.isDisposed) {
        // Create a new widget if one does not exist
        // Create a blank content widget inside of a MainAreaWidget
        const content = new KuberenetesMainWidget();
        widget = new MainAreaWidget({ content });
        widget.id = 'jupyterlab_k8s_explorer-jupyterlab';
        widget.title.label = 'Kubernetes Explorer';
        widget.title.closable = true;
      }
      if (!tracker.has(widget)) {
        // Track the state of the widget for later restoration
        tracker.add(widget);
      }
      if (!widget.isAttached) {
        // Attach the widget to the main work area if it's not three
        app.shell.add(widget, 'main');
      }
      // Activate the widget
      widget.content.update();
      app.shell.activateById(widget.id);
    }
  });

  // Add the command to the palette
  palette.addItem({ command, category: 'Tutorial' });

  const tracker = new WidgetTracker<MainAreaWidget<KuberenetesMainWidget>>({
    namespace: 'jupyterlab_k8s_explorer'
  });

  restorer.restore(tracker, {
    command,
    name: () => 'jupyterlab_k8s_explorer'
  });

  console.log('ICommandPalatte:', palette);
}

/**
 * Initialization data for the jupyterlab_k8s_explorer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_k8s_explorer:plugin',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer],
  activate: activate
};

export default plugin;
