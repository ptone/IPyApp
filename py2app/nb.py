import os

from IPython.html import notebookapp

from zmq.eventloop import ioloop
ioloop.install()

class QuickShutdownNotebookApp(notebookapp.NotebookApp):
    def _confirm_exit(self):
        self.log.critical("Shutting down")
        ioloop.IOLoop.instance().stop()

NOTEBOOK_STORAGE = os.path.expanduser('~/Library/ipyapp-notebooks/')
if __name__ == '__main__':
    if not os.path.exists(NOTEBOOK_STORAGE):
        os.makedirs(NOTEBOOK_STORAGE)
    QuickShutdownNotebookApp.launch_instance(argv=['--no-browser', '--notebook-dir=%s' % NOTEBOOK_STORAGE])
